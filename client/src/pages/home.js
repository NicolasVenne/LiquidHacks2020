import React, {useState} from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import {useUser} from "../context/firebase"
import SideBar from '../components/sidebar'
import Team from './team';
import Friends from './friends'
import Tournament from './tournament'
import Play from './play'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

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



const HomeGrid = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 80px ${props => props.expanded ? "300px" : "10px"} 1fr;
  grid-template-areas: 'sidebar menu content';
  transition: all 250ms ease;
  width: 100vw;
  height: 100%;
  background: linear-gradient(66.92deg, #060612 23.02%, #07051E 95.48%);
  
`





const Home = () => {
  const [expanded, setExpanded] = useState(true)
  return (
    <HomeGrid expanded={expanded}>
      <SideBar/>
      <Switch>
        <Route path="/play" component={Play}/>
        <Route path="/team" component={Team}/>
        <Route path="/tourney" component={Tournament}/>
        <Route path="/friends" component={Friends}/>
      </Switch>
    </HomeGrid>
  )
}

export default Home