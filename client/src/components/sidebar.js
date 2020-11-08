import React, {useState} from 'react';
import styled from 'styled-components';
import icon from '../assets/home-icon.png';
import playIcon from '../assets/play_icon.svg';
import friendList from '../assets/friend_list.svg';
import messaging from '../assets/messaging.svg';
import tournament from '../assets/tournament.svg';
import discord from '../assets/discord.svg';
import {useHistory, Link} from "react-router-dom"

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;


`



const SideBarIconComp = ({icon, active, to="/", ...rest}) => {
  return <Link to={to} {...rest}><img src={icon}/></Link>
}

const SideBarIcon = styled(SideBarIconComp)`
  border: 1px solid #DA9526;
  box-sizing: border-box;
  border-radius: 6px;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  alignt-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0.875rem 0;

  transition: background 150ms ease;

  background: ${props => props.active ? "rgba(221, 151, 38, 0.5)" : undefined};


  :hover {
    background: rgba(221, 151, 38, 0.5);
  }
`



const SideBarComp = ({...rest}) => {
    const history = useHistory();
    return (
        <div {...rest}>
          <img src={icon} style={{width: "45px"}}/>
          <IconContainer>
            <SideBarIcon to="/play" icon={playIcon} active={history.location.pathname.substring(0,5) === "/play"}/>
            <SideBarIcon to="/team" icon={friendList} active={history.location.pathname.substring(0,5) === "/team"}/>
            <SideBarIcon to="/tourney" icon={tournament} active={history.location.pathname.substring(0,8) === "/tourney"}/>
            <SideBarIcon to="/friends" icon={messaging} active={history.location.pathname.substring(0,7) === "/friends"}/>

          </IconContainer>
        </div>
    )
}


const SideBar = styled(SideBarComp)`
  background: #09091B;
  grid-area: sidebar;
  border-right: 1px solid #474747;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;


`

export default SideBar;