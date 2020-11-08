import React from 'react';
import styled from 'styled-components';
import icon from '../assets/home-icon.png'
import Button from '../components/button';
import Heading from '../components/heading';
import discord from '../assets/discord.svg';

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
`

const CenterDiv = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`



const Landing = () => {
  const history = useHistory();  

  return (
    <LandingPage>
      <CenterDiv>
        <img src={icon} />
        <Heading.H1>SCRIM OF LEGENDS</Heading.H1>
        <Button text="Log in with Discord" onClick={() => history.push("/dashboard/")} style={{marginTop: "5rem"}}><img src={discord} style={{marginLeft: "-0.5rem"}}/></Button>
      </CenterDiv>
    </LandingPage>
  )
}


export default Landing;