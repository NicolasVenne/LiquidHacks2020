import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '../components/grid';
import Menu from '../components/menu'
import Text from '../components/text'




const Play = () => {
  
  return <>
    <Grid.Menu>
        <Menu.Header>
          Play
        </Menu.Header>
      
    </Grid.Menu>
    <Grid.Content>
      <Text>Play hub...</Text>
    </Grid.Content>
  </>
}

export default Play;