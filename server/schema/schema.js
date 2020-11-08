const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type UserAccount {
    id: ID!,
    discordAccount: DiscordAccount!, 
    leagueAccount: LeagueAccount!,
    isOnline: Boolean
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
    players: [UserAccount]
  }

  type Query {
    userAccounts: [UserAccount]
    userAccount(id: ID!): UserAccount!
  }
`;

module.exports = typeDefs;