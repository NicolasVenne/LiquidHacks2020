import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Grid from '../components/grid';
import IconButton from '../components/icon-button';
import Menu from '../components/menu'
import add from "../assets/add.svg"
import Modal from '../components/modal';
import Text from '../components/text'
import Input from '../components/input'
import Button from '../components/button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { useUser } from '../context/firebase';

const USER_TEAMS = gql`
  query getUserTeams($id: String!) {
    userTeams(accountId: $id) {
        name
        id

    }
  }
`;

const CREAET_TEAM = gql`
  mutation createTeam($user: String!, $team: String!) {
    createCustomTeam(accountId: $user, teamName: $team) {
      name
    }
  }
`

const DELETE_TEAM = gql`
  mutation deleteTeam($user: String!, $team: String!) {
    deleteCustomTeam(deletingAccountId: $user, teamId: $team)
  }
`

const TeamComp = (props) => {
  console.log(props)
  const [deleteTeam, { data }] = useMutation(DELETE_TEAM, {
    
  });
  const user = useUser();
  const history = useHistory();

  return (
    <div style={{padding: "2rem"}}>
      <Button text={"Delete Team"} onClick={() => {
        console.log(user.id, props.match.params.name);
         deleteTeam({variables: {user: user.id, team: props.match.params.name}})
         history.push("/team");
         }}/>
    </div>
  )
}


const Team = () => {
  const history = useHistory();
  const [openAddTeam, setOpenAddTeam] = useState(false);
  const teamNameRef = useRef(null);
  const user = useUser();
  const [userTeams, setUserTeams] = useState();


  const [createTeam, { data }] = useMutation(CREAET_TEAM, {
    onCompleted: (e) => {
      console.log(e)
      getUserTeams({variables: {id: user.id}})
    }
  });
  const [getUserTeams] = useLazyQuery(USER_TEAMS, {
    onCompleted: (teams) => {
      console.log(teams);
      setUserTeams(teams.userTeams);
    },
    fetchPolicy: "network-only"
  });

  

  useEffect(() => {
    if(user) {
      getUserTeams({variables: {id: user.id}})
    }
  }, [user])

  

  const addTeam = () => {
    console.log(teamNameRef.current.value)
    console.log(user);
    createTeam({variables: {user: user.id, team: teamNameRef.current.value}})
    setOpenAddTeam(false);
  }
  
  

  return <>
    <Grid.Menu>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <Menu.Header>
          Teams
        </Menu.Header>
        <IconButton icon={add} onClick={() => {setOpenAddTeam(true); console.log("click")}}/>
      </div>
      {
        userTeams && 
        userTeams.map(({id, name}) => {
          return (
            <Menu.Link key={id} to={`/team/${id}`} active={history.location.pathname === `/team/${id}`}>
              {name}
            </Menu.Link>
          )
        })
      }
    </Grid.Menu>
    <Grid.Content>
      <Switch>
        <Route path="/team/:name" component={TeamComp}/>
        
      </Switch>
      <Modal open={openAddTeam} close={() => {setOpenAddTeam(false)}}>
        <Input.Text fwdRef={teamNameRef} label={"Team name"} />
        <br/>
        <Button text={"Add"} onClick={addTeam}></Button>
      </Modal>
    </Grid.Content>
  </>
}

export default Team;