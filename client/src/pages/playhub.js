import React, {useState} from 'react';
import styled from 'styled-components';
import icon from '../assets/home-icon.png'
import MenuButton from '../components/menu-button';
import Heading from '../components/heading';
import discord from '../assets/discord.svg';
import QuickMatch from './quick-match'
// import TeamScrimmage from './team-scrimmage'
// import Tournament from './tournament'
import { useHistory } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import PrivateRoute from "../components/private-route";


const ButtonBar = styled.div`
  background: linear-gradient(69.81deg, #000000 0%, #000533 99.67%);
  border-right: 2px solid #474747;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 350px;
  position: absolute;
  top: 0;
`

    

const Playhub = () => {
  const [selectedButton, setSelected] = useState();
  const buttons = [1, 2, 3]; 
  const history = useHistory();

  return (
    <>
      <ButtonBar>
        <Heading.H1>Play Hub</Heading.H1>
          <MenuButton onClick={() => {history.push("/dashboard/playhub/quickmatch"); setSelected(1);}} isSelected={1 === selectedButton} text="Quick Match" style={{width: "300px", "margin-top": "20px"}}></MenuButton>
          <MenuButton onClick={() => {history.push("/dashboard/playhub/teamscrimmage"); setSelected(2);}} text="Team Scrimmage" isSelected={2 === selectedButton} style={{width: "300px", "margin-top": "20px"}}></MenuButton>
          <MenuButton onClick={() => {history.push("/dashboard/playhub/tournament"); setSelected(3);}} text="Tournament" isSelected={3 === selectedButton} style={{width: "300px", "margin-top": "20px"}}></MenuButton>
      </ButtonBar>
        <Switch>
          <PrivateRoute path="/dashboard/playhub/quickmatch" component={QuickMatch}/>
          {/* <PrivateRoute path="/dashboard/playhub/teamscrimmage" component={TeamScrimmage}/>
          <PrivateRoute path="/dashboard/playhub/tournament" component={Tournament}/> */}
        </Switch>
    </>
  )
}

export default Playhub;