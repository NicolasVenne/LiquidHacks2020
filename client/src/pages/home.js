import React from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

const USER_ACCOUNTS = gql`
  query GetUserInfo {
    userAccounts {
      id
      leagueAccount {
        name
        rank {
          tier
          rank
        }
      }
    }
  }
`;

const Home = () => {

  const { loading, error, data } = useQuery(USER_ACCOUNTS);

  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default Home