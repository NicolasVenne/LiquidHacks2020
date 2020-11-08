// import React, {useState} from 'react';
// import styled from 'styled-components';
// import icon from '../assets/home-icon.png';
// import playIcon from '../assets/play_icon.svg';
// import friendList from '../assets/friend_list.svg';
// import messaging from '../assets/messaging.svg';
// import tournament from '../assets/tournament.svg';
// import discord from '../assets/discord.svg';
// import {useHistory, Link} from "react-router-dom"

// const IconContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 3rem;


// `
// // const SideBarIconLink = styled.div`
// //   border: 1px solid #DA9526;
// //   box-sizing: border-box;
// //   border-radius: 6px;
// //   width: 2.5rem;
// //   height: 2.5rem;
// //   display: flex;
// //   alignt-items: center;
// //   justify-content: center;
// //   cursor: pointer;
// //   margin: 0.875rem 0;

// //   transition: background 150ms ease;

// //   background: ${props => props.active === "true" ? "rgba(221, 151, 38, 0.5)" : undefined};


// //   :hover {
// //     background: rgba(221, 151, 38, 0.5);
// //   }
// // `


// // const SideBarIcon = ({icon, to="/", ...rest}) => {
// //   const history = useHistory();
// //   return <SideBarIconLink to={to} active={history.location.pathname === to} {...rest}><img src={icon}/></SideBarIconLink>
// // }



// const SideBarComp = ({...rest}) => {
//     // const history = useHistory();
//     return (
//         <div {...rest}>
//           <img src={icon} style={{width: "45px"}}/>
//           <IconContainer>
//             {/* <SideBarIcon to="/play" icon={playIcon} />
//             <SideBarIcon to="/team" icon={friendList} />
//             <SideBarIcon to="/tourney" icon={tournament} />
//             <SideBarIcon to="/friends" icon={messaging} /> */}

//           </IconContainer>
//         </div>
//     )
// }


// const SideBar = styled(SideBarComp)`
//   background: #09091B;
//   grid-area: sidebar;
//   border-right: 1px solid #474747;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding-top: 1rem;


// `

// export default SideBar;