const express = require("express");
const btoa = require('btoa');
const fetch = require('node-fetch')
const { admin } = require('./database/database')
const port = process.env.PORT || 3001;
const url = process.env.NODE_ENV === "production" ? "https://scrim-of-legends.herokuapp.com" : "http://localhost:3001"

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
      `&redirect_uri=${url}/authorize`
    ].join(''));
});

app.get('/authorize', async (req, res) => {
    const code = req.query.code;
    const creds = btoa(`${discordConfig.id}:${discordConfig.secret}`);
    const body = {
        grant_type : "authorization_code",
        code : req.query.code,
        redirect_uri : `${url}/authorize`
    }

    const data = {
        'client_id': discordConfig.id,
        'client_secret': discordConfig.secret,
        'grant_type': 'authorization_code',
        'code': req.query.code,
        'redirect_uri': `${url}/authorize`,
        'scope': 'identify'
      }

    try{
        const response = await fetch(`https://discord.com/api/v6/oauth2/token`, {
            method: 'POST',
            body: searchParams(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        })

        const json = await response.json();
        const customToken = await admin.auth().createCustomToken(json.access_token)

        
        res.redirect(`http://localhost:3000?token=${customToken}`);
    }
    catch(err){
        console.log(err)
    }
});

//Create graphql server
const server = new ApolloServer({ typeDefs, resolvers, playground: true });
server.applyMiddleware({ app, path: "/api", cors: true });

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../../client/build'))
}

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})
  
