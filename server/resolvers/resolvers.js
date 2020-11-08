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
        },

        addFriend: async (_, {requestingId, acceptingId}) => {
            const requestingAccountRef = await db.collection('userAccounts').doc(requestingId)
            const requestingAccount = await requestingAccountRef.get()
            const acceptingAccountRef = await db.collection('userAccounts').doc(acceptingId)
            const acceptingAccount = await acceptingAccountRef.get()

            const requestingAccountData = requestingAccount.data()
            const acceptingAccountData = acceptingAccount.data()

            const requestingFriends = requestingAccountData.friends ? requestingAccountData.friends : []
            const acceptingFriends = acceptingAccountData.friends ? acceptingAccountData.friends : []

            if(!requestingFriends.includes(acceptingAccountData.id)){
                requestingFriends.push(acceptingAccountData.id)
                await requestingAccountRef.update({friends: requestingFriends})
                requestingAccountData.friends=requestingFriends
            }
            if(!acceptingFriends.includes(requestingAccountData.id)){
                acceptingFriends.push(requestingAccountData.id)
                await acceptingAccountRef.update({friends: acceptingFriends})
            }

            return requestingAccountData
        },

        removeFriend: async (_, {requestingId, acceptingId}) => {
            const requestingAccountRef = await db.collection('userAccounts').doc(requestingId)
            const requestingAccount = await requestingAccountRef.get()
            const acceptingAccountRef = await db.collection('userAccounts').doc(acceptingId)
            const acceptingAccount = await acceptingAccountRef.get()

            const requestingAccountData = requestingAccount.data()
            const acceptingAccountData = acceptingAccount.data()

            const requestingFriends = requestingAccountData.friends ? requestingAccountData.friends.filter(id => id != acceptingId) : []
            const acceptingFriends = acceptingAccountData.friends ? acceptingAccountData.friends.filter(id => id != requestingId) : []

            await requestingAccountRef.update({friends: requestingFriends})
            await acceptingAccountRef.update({friends: acceptingFriends})

            requestingAccountData.friends = requestingFriends

            return requestingAccountData
        },

        createCustomTeam: async(_, {accountId, teamName}) => {
            const customTeamsRef = db.collection('customTeams')
            const snapshot = await customTeamsRef.where('name', '==', teamName).get();

            if(!snapshot.empty)
                return snapshot.docs[0].data()

            const ownerAccount = await db.collection('userAccounts').doc(accountId).get()
            const ownerAccountData = await ownerAccount.data()

            const customTeamData = {
                name: teamName,
                owner: ownerAccountData,
                members: [ownerAccountData]
            }
            
            const res = await db.collection('customTeams').add(customTeamData)
            await db.collection('customTeams').doc(res.id).update({id: res.id})

            customTeamData.id = res.id

            return customTeamData
        },

        deleteCustomTeam: async(_, {deletingAccountId, teamId}) => {
            const customTeamDoc = await db.collection('customTeams').doc(teamId).get()
            const customTeamData = customTeamDoc.data()

            if(customTeamData.owner.id == deletingAccountId){
                await db.collection('customTeams').doc(teamId).delete()
                return "Succesfully deleted custom team!"
            }
            else{
                return "You must be the owner of a team to delete it!"
            }
                
        },

        addCustomTeamMember: async(_, {teamId, accountId}) => {
            const newMemberDoc = await db.collection('userAccounts').doc(accountId).get()
            const customTeamDoc = await db.collection('customTeams').doc(teamId).get()

            const newMemberData = newMemberDoc.data()
            const customTeamData = customTeamDoc.data()

            if(!customTeamData.members.find(member => member.id == accountId)){
                customTeamData.members.push(newMemberData)
                await db.collection('customTeams').doc(customTeamData.id).update({members: customTeamData.members})
                return customTeamData
            }
            else{
                return customTeamData
            }
        },

        removeCustomTeamMember: async(_, {teamId, accountId}) => {
            const removeMemberDoc = await db.collection('userAccounts').doc(accountId).get()
            const customTeamDoc = await db.collection('customTeams').doc(teamId).get()

            const removeMemberData = removeMemberDoc.data()
            const customTeamData = customTeamDoc.data()

            if(customTeamData.members.find(member => member.id == accountId)){
                customTeamData.members = customTeamData.members.filter(member => member.id != accountId)
                await db.collection('customTeams').doc(customTeamData.id).update({members: customTeamData.members})
                return customTeamData
            }
            else{
                return customTeamData
            }
        }
    }
  };

 module.exports = resolvers;