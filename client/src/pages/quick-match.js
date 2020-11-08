import React, {useState} from 'react';
import styled from 'styled-components';
import Button from '../components/button';
import Heading from '../components/heading';
import discord from '../assets/discord.svg';
import battle from '../assets/battle.svg';
import user from '../assets/user.svg';
import Text from "../components/text";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link
} from "react-router-dom";

const QuickMatchLobby = styled.div`
  height: 100%;
  position: absolute;
  width: calc(100vw - 350px);
  top: 0;
  left: 350px;
  overflow: hidden;
  img {
    colour: white;
  }
`

const AllyTeam = styled.div`
display:flex;
  justify-content: space-around;
  text-align: center;
  
`

const OpponentTeam = styled.div`
display:flex;
  justify-content: space-around;
  text-align: center;
  
`



const Team = styled.div`
display: flex;
height: 60%;
flex-direction: column;
justify-content: space-between;
img {
  height: 100px;
  width: 100px;
  
  -moz-border-radius: 30px; /* or 50% */
  border-radius: 50px; /* or 50% */
  background-color: white;
  color: white;
  text-align: center;
  font-size: 2em;
}
`

const QuickMatch = () => {
    return (
        <QuickMatchLobby>
          {/* <Button 
            text="Begin Matchmaking" 
            style={{}}
            // onClick={}
          ><img src={battle}/></Button>
          <Button 
            text="Open Team in Discord" 
            style={{"margin-left": "55vw"}}
            // onClick={}
          ><img src={discord}/></Button> */}
          <Team>
            <AllyTeam>
              <div>
                <img src={user}/>
                <Text size={1}>YourSummonerName</Text>
              </div>
              <div>
                <img src={user}/>
                <Text size={1}>YourSummonerName</Text>
              </div>
              <div>
                <img src={user}/>
                <Text size={1}>YourSummonerName</Text>
              </div>
              <div>
                <img src={user}/>
                <Text size={1}>YourSummonerName</Text>
              </div>
              <div>
                <img src={user}/>
                <Text size={1}>YourSummonerName</Text>
              </div>
            </AllyTeam>
            <OpponentTeam>
              <div>
                <img src={user}/>
                <Text size={1}>YourSummonerName</Text>
              </div>
              <div>
                <img src={user}/>
                <Text size={1}>YourSummonerName</Text>
              </div>
              <div>
                <img src={user}/>
                <Text size={1}>YourSummonerName</Text>
              </div>
              <div>
                <img src={user}/>
                <Text size={1}>YourSummonerName</Text>
              </div>
              <div>
                <img src={user}/>
                <Text size={1}>YourSummonerName</Text>
              </div>
            </OpponentTeam>
            
          </Team>
        </QuickMatchLobby>
    )
}

export default QuickMatch;