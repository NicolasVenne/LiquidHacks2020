const express = require("express");
const btoa = require('btoa');
const fetch = require('node-fetch')
const admin = require('./database/database')
const port = process.env.PORT || 3001;

// Construct a schema, using GraphQL schema language
const typeDefs = require("./schema/schema");

// Provide resolver functions for your schema fields
const resolvers = require("./resolvers/resolvers");

// Create GraphQL express server
const { ApolloServer } = require("apollo-server-express");

// Setup express cloud function
const app = express();

let discordConfig = require('./resources/discord-config.json')


const searchParams = (params) => Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');

app.get('/login', (req, res) => {
    res.redirect([
      'https://discordapp.com/oauth2/authorize',
      `?client_id=${discordConfig.id}`,
      '&scope=identify',
      '&response_type=code',
      `&redirect_uri=http://localhost:5000/scrim-of-legends/us-central1/graphql/authorize`
    ].join(''));
});

app.get('/authorize', async (req, res) => {
    const code = req.query.code;
    const creds = btoa(`${discordConfig.id}:${discordConfig.secret}`);
    const body = {
        grant_type : "authorization_code",
        code : req.query.code,
        redirect_uri : "http%3A%2F%2Flocalhost%3A5000%2Fscrim-of-legends%2Fus-central1%2Fgraphql%2Fauthorize"
    }

    const data = {
        'client_id': discordConfig.id,
        'client_secret': discordConfig.secret,
        'grant_type': 'authorization_code',
        'code': req.query.code,
        'redirect_uri': "http://localhost:5000/scrim-of-legends/us-central1/graphql/authorize",
        'scope': 'identify'
      }

      console.log(code)
      

    try{
        const response = await fetch(`https://discord.com/api/v6/oauth2/token`, {
            method: 'POST',
            body: searchParams(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        })

        // console.log(response)

        const json = await response.json();
        res.redirect(`http://localhost:5000/scrim-of-legends/us-central1/graphql/token?token=${json.access_token}`);
    }
    catch(err){
        console.log(err)
    }
    

    
    
});

app.get('/token', async (req, res) => {
    console.log(req.query.token)
    const user = await fetch('https://discord.com/api/v6/users/@me', {
        headers: {
            Authorization : `Bearer ${req.query.token}`
        }
    })
    const userJson = await user.json()

    const customToken = await admin.auth().createCustomToken(userJson.id)

    res.send({token: customToken})
})


//Create graphql server
const server = new ApolloServer({ typeDefs, resolvers, playground: true });
server.applyMiddleware({ app, path: "/", cors: true });

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('expert-system/build'))
}

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})
  
