// Connect to firebase database, which we created in step 3
const { db } = require("../database/database"); 
const fetch = require("node-fetch")
const discordConfig = require("../resources/discord-config.json")
const leagueConfig = require("../resources/league-config.json")

// Here Firebase returns an object and GraphQL is expecting an array, so we need to extract the values.

const resolvers = {
    Query: {
        userAccounts: async () => {
            const userAccounts = await db.collection('userAccounts').get()
            return userAccounts.docs.map(userAccount => userAccount.data())
        },
        userAccount: async (_,args) => {
            const userAccount = await db.collection('userAccounts').doc(args.id).get();
            return userAccount.data()
        }
    },
    Mutation: {
        createUserAccount: async (_, {summonerId, discordAccessToken}) => {
            console.log("MUTATOR")
            const summonerInfo = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/${summonerId}?api_key=${leagueConfig.key}`)
            const {id, accountId, puuid, name} = await summonerInfo.json()
            const summonerRankedInfo = await fetch(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${leagueConfig.key}`)
            const { tier, rank, wins, losses } = await summonerRankedInfo.json()

            const discordUser = await fetch('https://discord.com/api/v8/users/@me', {
            headers: {
                Authorization: `Bearer ${discordAccessToken}`,
                "Content-Type": "application/json"
            }
            })
            const discordUserJson = await discordUser.json()

            const newUserAccount = {
                id: discordUserJson.id,
                leagueAccount: {
                    summonerId: id,
                    accountId: accountId,
                    puuid: puuid,
                    name: name
                },
                discordAccount: {
                    id: discordUserJson.id,
                    username: discordUserJson.username,
                    discriminator: discordUserJson.discriminator,
                    avatar: discordUserJson.avatar
                },
                isOnline: false
            }

            if(tier){
                newUserAccount.leagueAccount.rank = {
                    tier: tier,
                    rank: rank,
                    wins: wins,
                    losses: losses
                }
            }

            const res = await db.collection('userAccounts').doc(discordUserJson.id).set(newUserAccount)

            return newUserAccount
        }
    }
  };

 module.exports = resolvers;