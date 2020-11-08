const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type UserAccount {
    id: ID!,
    discordAccount: DiscordAccount!, 
    leagueAccount: LeagueAccount!,
    isOnline: Boolean,
    friends: [String]
  }

  type LeagueAccount {
    summonerId: String!,
    accountId: String,
    puuid: String,
    name: String,
    rank: LeagueRank
  }

  type LeagueRank {
    tier: String,
    rank: String,
    wins: Int,
    losses: Int
  }

  type DiscordAccount {
    id: ID!,
    username: String,
    discriminator: String,
    avatar: String
  }

  type MatchLobby {
    id : ID!,
    teams : [MatchTeam],
    lobbyHost : UserAccount
  } 

  type MatchTeam {
    players : [UserAccount],
    side: String
  }

  type CustomTeam {
    id: String!,
    members: [UserAccount],
    name: String,
    owner: UserAccount
  }

  type Query {
    userAccounts: [UserAccount]
    userAccount(id: ID!): UserAccount!
  }

  type Mutation {
    createUserAccount(summonerId: String!, discordAccessToken: String!) : UserAccount
    createCustomTeam(accountId: String!, teamName: String!) : CustomTeam
    deleteCustomTeam(deletingAccountId: String!, teamId: String!) : String
    addCustomTeamMember(teamId: String!, accountId: String!) : CustomTeam
    removeCustomTeamMember(teamId: String!, accountId: String!) : CustomTeam
    addFriend(requestingId: String!, acceptingId: String!): UserAccount
    removeFriend(requestingId: String!, acceptingId: String!): UserAccount
  }
`;

module.exports = typeDefs;