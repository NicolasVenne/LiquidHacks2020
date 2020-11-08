import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '../components/grid';
import Menu from '../components/menu'
import Text from '../components/text'



const Tournament = () => {
  


  

  return <>
    <Grid.Menu>
        <Menu.Header>
          Tournament
        </Menu.Header>
     
    </Grid.Menu>
    <Grid.Content>
      <Text>Tournament</Text>
    </Grid.Content>
  </>
}

export default Tournament;