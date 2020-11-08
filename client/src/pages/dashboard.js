import React from 'react';
import styled from 'styled-components';
import SideBar from '../components/sidebar';
import Playhub from '../pages/playhub';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from "../components/private-route";

const MainPage = styled.div`
  background: linear-gradient(69.81deg, #000000 0%, #000533 99.67%);
  height: 100%;
  position: absolute;
  width: calc(100vw - 86px);
  top: 0;
  left: 86px;
  overflow: hidden;
`


const Dashboard = () => {
  
    return (
      <>
        <SideBar></SideBar>
        <MainPage>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard/playhub">
            <PrivateRoute path="/dashboard/playhub" component={Playhub}/>
          </Route>
        </Switch>
        </MainPage>
      </>
    )
  }

export default Dashboard;