import React from 'react';
import styled from 'styled-components';
import icon from '../assets/home-icon.png'
import Button from '../components/button';
import Heading from '../components/heading';
import SideBar from '../components/sidebar';
import Playhub from '../pages/playhub';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const SideBarDiv = styled.div`
    background: linear-gradient(66.92deg, #060612 23.02%, #07051E 95.48%);
    display: flex;
    width: 85px;
    height: 100%;
    border-right: 1px solid #474747
`

const MainDiv = styled.div`
    width: 85vw;
    height: 100%;
    
`

const Dashboard = () => {
  
    return (
      <Router>
        <SideBar></SideBar>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard/playhub">
            {/* <Landing/> */}
              <Playhub/>

          </Route>
        </Switch>
      </Router>

    )
  }

export default Dashboard;