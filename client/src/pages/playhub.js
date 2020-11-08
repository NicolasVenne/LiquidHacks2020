import React, {useState} from 'react';
import styled from 'styled-components';
import icon from '../assets/home-icon.png'
import Button from '../components/button';
import Heading from '../components/heading';
import discord from '../assets/discord.svg';
import { useHistory } from 'react-router-dom';


const MainPage = styled.div`
  background: linear-gradient(69.81deg, #000000 0%, #000533 99.67%);
  height: 100%;
  position: absolute;
  width: calc(100% - 435px);
  top: 0;
  left: 435px;
`

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
  left: 86px;
`

    

const Playhub = () => {
  const [selectedButton, setSelected] = useState()
  const buttons = [1, 2, 3]; 
  const history = useHistory();

  return (
    <>
      <ButtonBar>
        <Heading.H1>Play Hub</Heading.H1>
          <Button onClick={() => {history.push("/dashboard/playhub/quickmatch"); setSelected(1);}} isSelected={1 === selectedButton} text="Quick Match" style={{width: "300px", "margin-top": "20px"}}></Button>
          <Button onClick={() => {history.push("/dashboard/playhub/teamscrimmage"); setSelected(2);}} text="Team Scrimmage" isSelected={2 === selectedButton} style={{width: "300px", "margin-top": "20px"}}></Button>
          <Button onClick={() => {history.push("/dashboard/playhub/tournament"); setSelected(3);}} text="Tournament" isSelected={3 === selectedButton} style={{width: "300px", "margin-top": "20px"}}></Button>
      </ButtonBar>
      <MainPage>
        
      </MainPage>
    </>
  )
}

export default Playhub;