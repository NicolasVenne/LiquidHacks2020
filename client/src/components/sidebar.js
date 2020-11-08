import React, {useState} from 'react';
import styled from 'styled-components';
import icon from '../assets/home-icon.png';
import playIcon from '../assets/play_icon.svg';
import friendList from '../assets/friend_list.svg';
import NavButton from './navButton';
import discord from '../assets/discord.svg';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Link
} from "react-router-dom";

const ParentDiv = styled.div`
  background: linear-gradient(66.92deg, #060612 23.02%, #07051E 95.48%);
	display: flex;
	flex-direction: column;
	align-items: center;
	border-right: 2px solid #474747;
	width: 85px;
	height: 100%;
`

const CenterDiv = styled.div`
  display: flex;
	flex-direction: column;
	height: 25vh;
	margin-bottom: 15px;
`

const MainIcon = styled.img`
	width: 45px;
	margin-bottom: 5vh;
`

const SideBar = () => {
		const [selectedButton, setSelected] = useState()
		const buttons = [1, 2]; 
    const history = useHistory();
    return (
        <ParentDiv>
            <MainIcon src={icon} style={{padding: "0.5rem"}}/>
            <CenterDiv>
                <NavButton onClick={() => {history.push("/dashboard/playhub"); setSelected(1);}} isSelected={1 === selectedButton} style={{"margin-bottom": "45px"}}><img src={playIcon}/></NavButton>
                <NavButton onClick={() => {history.push("/dashboard/friends"); setSelected(2);}} isSelected={2 === selectedButton}><img src={friendList}/></NavButton>
            </CenterDiv>
						<img style={{position: "absolute", bottom: "10px"}} onClick={() => history.push("/dashboard/discord")} src={discord}></img>
        </ParentDiv>
    )
}

export default SideBar;