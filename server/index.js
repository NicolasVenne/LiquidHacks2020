const express = require("express");
const cors = require("cors")
const btoa = require('btoa');
const fetch = require('node-fetch')
const { admin } = require('./database/database')
const port = process.env.PORT || 3001;
const url = process.env.NODE_ENV === "production" ? "https://scrim-of-legends.herokuapp.com" : "http://192.168.0.7:3001"

// Construct a schema, using GraphQL schema language
const typeDefs = require("./schema/schema");

// Provide resolver functions for your schema fields
const resolvers = require("./resolvers/resolvers");

// Create GraphQL express server
const { ApolloServer } = require("apollo-server-express");

// Setup express cloud function
const app = express();
app.use(cors())
app.use(express.json())

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
    if(req.query.error === "access_denied"){
        res.redirect("http://localhost:3000/login")
    }
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
        

        const {access_token} = await response.json();
        const discordUser = await fetch('https://discord.com/api/v8/users/@me', {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
            })
        const {id, username} = await discordUser.json()
        
        const customToken = await admin.auth().createCustomToken(id, {access_token})
        
        try{
            const user = await admin.auth().getUser(id)
        }
        catch(err){
            await admin.auth().createUser({
                displayName: username,
                uid: id
            })
        }
        
        

        res.redirect(`http://localhost:3000?token=${customToken}`);
    }
    catch(err){
        console.log(err)
    }
});

app.post('/verifySummonerName', async (req,res) => {
    const { key, host } = require('./resources/league-config.json')
    const apiPath = 'lol/summoner/v4/summoners/by-name'
    const { summonerName } = req.body

    const summonerResponse = await fetch(`https://${host}/${apiPath}/${summonerName}?api_key=${key}`)
    const summonerInfo = await summonerResponse.json()
    
    if(summonerInfo.status)
        res.status(summonerInfo.status.status_code).send(summonerInfo.status.message)
    else
        res.send(summonerInfo)
})

app.post('/verifySummonerAccount', async (req, res) => {
    const { key, host } = require('./resources/league-config.json')
    const apiPath = 'lol/platform/v4/third-party-code/by-summoner'
    const { summonerId, code} = req.body

    const codeResponse = await fetch(`https://${host}/${apiPath}/${summonerId}?api_key=${key}`)

    if(codeResponse.status !== 200){
        res.status(404).send({"error" : "No verification code exists for that user!"})
    }
    else{
        const codeInfo = await codeResponse.json()

        if(codeInfo == code)
            res.send(codeInfo)
        else
            res.status(404).send({"error" : "That accounts contains a different verification code!"})
    }
})

//Create graphql server
const server = new ApolloServer({ typeDefs, resolvers, playground: true });
server.applyMiddleware({ app, path: "/", cors: true });

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('../../client/build'))
}

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})
  
