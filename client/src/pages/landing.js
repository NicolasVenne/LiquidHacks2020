import React from 'react';
import styled from 'styled-components';
import icon from '../assets/home-icon.png'
import Button from '../components/button';
import Heading from '../components/heading';
import discord from '../assets/discord.svg';
import Line from '../components/line';
import { useUser } from '../context/firebase';
import { Redirect } from 'react-router-dom';
import Loading from '../components/loading';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link
} from "react-router-dom";

const LandingPage = styled.div`
  background: linear-gradient(69.81deg, #000000 0%, #000533 99.67%);
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

`

const CenterDiv = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const handleLogin = () => {
  // window.location.href = "https://scrim-of-legends.herokuapp.com/login"
  window.location.href = "http://192.168.0.7:3001/login"
}

const Landing = () => {
  
  const user = useUser();

  

  return (
    <LandingPage>
      {user === null ? <Loading/> : !user ? <>
        <CenterDiv>
        <img src={icon} />
        <Heading.H1>SCRIM OF LEGENDS</Heading.H1>
        <Button 
          text="Log in with Discord" 
          style={{marginTop: "5rem"}}
          onClick={handleLogin}
        ><img src={discord} style={{marginLeft: "-0.5rem"}}/></Button>
      </CenterDiv>
      <Line color={"#DA9526"} top={"10vw"} right={"-30vw"} style={{transform: "rotate(45deg)"}}/>
      <Line color={"#001AFF"} top={"10vw"} right={"-35vw"} style={{transform: "rotate(45deg)"}}/>
      <Line color={"#DA9526"} bottom={"10vw"} left={"-30vw"} style={{transform: "rotate(45deg)"}}/>
      <Line color={"#001AFF"} bottom={"10vw"} left={"-35vw"} style={{transform: "rotate(45deg)"}}/>
      </> : <Redirect to="/"/> }
    </LandingPage>
  )
}


export default Landing;