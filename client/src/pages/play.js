import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '../components/grid';
import Menu from '../components/menu'
import React, {useState} from 'react';
import Button from '../components/button';
import Heading from '../components/heading';
import discord from '../assets/discord.svg';
import battle from '../assets/battle.svg';
import emptyUserIcon from '../assets/user.svg';
import Text from "../components/text";
import {useUser} from '../context/firebase'
import { empty } from '@apollo/client';


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
  border-bottom: 5px solid blue;
  padding-bottom: 2rem;
`

const OpponentTeam = styled.div`
  display:flex;
  justify-content: space-around;
  text-align: center;
  border-top: 5px solid red;
  padding-top: 2rem;
  
`

const Team = styled.div`
padding-top: 2rem;

display: flex;
height: 60%;
flex-direction: column;
justify-content: space-between;
margin-top: 2rem;

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

const MatchmakingButton = styled.div`
  display:flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 2rem;
`


const DiscordButton = styled.div`
  display:flex;
  justify-content: flex-end;
  text-align: center;
`

const RoomInfo = styled.div`
  display:flex;
  box-sizing: content-box;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  border: 5px solid white;
  width: 40rem;
  height: 10rem;
  background: black;
`

const Play = () => {
  const user = useUser();
  var matchButtonText = "Begin Matchmaking"
  const matchInfo = {
    MatchHost: "Renellius",
    MatchPassword: "1234"
  };
  const history = useHistory();
    const team = ["paolo", "nick", "josh", "jim", "bob"];
    const enemyTeam = ["joe", "frank", "tom", "anotherNick", "Bjergsen"];
    return <>
    <Grid.Menu>
      <Menu.Header>
        Play Hub
      </Menu.Header>
      <Menu.Link to="/play" active={history.location.pathname === "/play"}>
        Quickplay
      </Menu.Link>
    </Grid.Menu>
    <Grid.Content>
      <QuickMatchLobby>
        <MatchmakingButton>
          <Button 
            text={matchButtonText}
            style={{}}
            onClick={matchButtonText="Looking for Players..."}
          ><img src={battle}/></Button>
        </MatchmakingButton>
        <DiscordButton>
          <Button 
            text="Open Team in Discord" 
            style={{"margin-right": "2rem", }}
            onClick={() => window.open("https://discord.gg/XxkD6fr2JK", '_blank')}
            ><img src={discord}/></Button>
        </DiscordButton>
        <Team>
          <AllyTeam>
            {team.map((player => {
              return (
              <div>
                <img src={emptyUserIcon || user}/>
                <Text size={1}>{player || "Searching..."}</Text>
              </div>
              )
            }))}
            
          </AllyTeam>
          <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
            <RoomInfo>
              <Text size={2}>Match Host: {matchInfo.MatchHost}</Text>
              <Text size={2}>Room Password: {matchInfo.MatchPassword}</Text>
            </RoomInfo>
          </div>
          <OpponentTeam>
            {enemyTeam.map((player => {
              return (
              <div>
                <img src={user || emptyUserIcon}/>
                <Text size={1}>{player || "Searching..."}</Text>
              </div>
              )
            }))}
          </OpponentTeam>
          
        </Team>
      </QuickMatchLobby>
    </Grid.Content>
  </>
}

export default Play;