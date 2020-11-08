import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '../components/grid';
import Menu from '../components/menu'




const Team = () => {
  const history = useHistory();
  return <>
    <Grid.Menu>
      <Menu.Header>
        Teams
      </Menu.Header>
      <Menu.Link to="/team" active={history.location.pathname === "/team"}>
        Me
      </Menu.Link>
    </Grid.Menu>
    <Grid.Content>
      I am conent
    </Grid.Content>
  </>
}

export default Team;