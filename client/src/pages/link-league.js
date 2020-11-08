import React, { useEffect, useState, useRef } from 'react';
import { useFirebase, useUser } from '../context/firebase'
import styled from 'styled-components';
import Button from '../components/button';
import Heading from '../components/heading'
import Input from '../components/input';
import Line from '../components/line'
import StepCircle from '../components/step-circle';
import Text from "../components/text";
import rightArrow from "../assets/right-arrow.svg"
import info from "../assets/info.svg"
import { gql, useMutation } from '@apollo/client';
import {getServerUrl} from '../context/server-url'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link,
  Redirect
} from "react-router-dom";

const CREATE_USER = gql`
  mutation createUser($summonerId: String!, $accessToken: String!) {
    createUserAccount(summonerId: $summonerId, discordAccessToken: $accessToken) {
      id
    }
  }
`;

const Page = styled.div`
  background: linear-gradient(69.81deg, #000000 0%, #000533 99.67%);
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
`
const StepCircleRow = styled.div`
  margin-top: 70px;
  margin-bottom: 3.375rem;
  display: flex;
  align-items: center;

`
const MiniLine = styled.div`
  height: 1px;
  width: 100px;
  background: white;
  margin: 0 25px;
`

const Container = styled.div`

  display: flex;
  flex-direction: column;
  width: 540px;

`



const LinkLeague = () => {
  const history = useHistory();
  const [path, setPath] = useState(history.location.pathname);
  const user = useUser();
  const summonerRef = useRef(null);
  const [code, setCode] = useState(0);
  const [id, setId] = useState(null);
  const [name, setName] = useState();
  const [error, setError] = useState();
  const [createUserAccount, { data }] = useMutation(CREATE_USER);
  const firebase = useFirebase();


  const lookUpSummoner = () => {
    setName(summonerRef.current.value)
    setError(null)
    fetch(`${getServerUrl()}/verifySummonerName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        summonerName: summonerRef.current.value
      })
    }).then((response) => {
      if(!response.ok) {
        throw new Error(response.statusText)
      }

      return response

    }).then((data) => {
      data.json().then((json) => {
        setId(json.id)
      });
      // setCode(Math.floor((Math.random() * 10000) + 10000))
      setCode(6969);
      history.push("/link/verify"); 
    }).catch((error) => {
      setError("Could not find summoner")
    })


  }

  const verifySummonerAccount = () => {
    setError(null)
    fetch(`${getServerUrl()}/verifySummonerAccount`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        summonerId: id,
        code
      })
    }).then((res) => {
      if(!res.ok) {
        throw Error(res.statusText)
      }
      return res
      
    }).then((response) => {
      response.json().then((json) => {
        if(json === code) {
          history.push("/link/confirm")
        }
      })
    }).catch((err) => {
      setError("Could not verify summoner")
    })
  }

  const linkAccount = () => {
    
    createUserAccount({variables: { accessToken: firebase.getDiscAccessToken(), summonerId: id }})
  }

  

  useEffect(() => {
    const listen = history.listen((location) => {
      setPath(location.pathname)
    })

    if(!name) {
      history.push("/link")
    }

    return () => {
      listen();
    }

    
  },[])
  
  if(user && user.state !== "CONNECT_LEAGUE") {
    return (<Redirect to="/"/>)
  }

  return (
    <Page>
      <CenterDiv>
        <Heading.H1 center>LINK YOUR <br/> LEAGUE OF LEGENDS</Heading.H1>
        <StepCircleRow>
          <StepCircle number={1} active={path === "/link"} />
          <MiniLine/>
          <StepCircle number={2} active={path === "/link/verify"}/>
          <MiniLine/>
          <StepCircle number={3} active={path === "/link/confirm"}/>
        </StepCircleRow>
        <Container>
          <Switch>
            <Route path="/link/confirm">
              <Text size={2} color={"#3CDE21"}>Verification confirmed</Text>
              <Text size={1.25} style={{marginTop: "1.25rem"}}>Link summoner <i>{name}</i> to your account?</Text>
              <div style={{display: "flex", alignSelf: "center"}}>
                <Button text={"Back"} primary style={{marginTop: "4rem", marginRight: "1rem", alignSelf: "center"}} onClick={() => {history.push("/link");}}/>

                <Button text={"Link"} primary style={{marginTop: "4rem", alignSelf: "center"}} onClick={linkAccount}/>
              </div>

            </Route>
            <Route path="/link/verify">
              <Text size={2}>Awesome, we found you!</Text>
              <Text size={1.25} style={{marginTop: "1.25rem"}}>We need to verify your summoner: <i>{name}</i></Text>
              <Text size={1.25} style={{marginTop: "1.25rem"}}>Copy - paste the verification code below into your League client. </Text>
              <div style={{display: "flex", alignItems: "center", marginTop: "1.25rem"}}>
                <Text size={1.25} >Settings</Text>
                <img style={{margin: "0 1rem"}} src={rightArrow}/>
                <Text size={1.25} >About</Text>
                <img style={{margin: "0 1rem"}} src={rightArrow}/>
                <Text size={1.25} >Verification</Text>
                <img style={{margin: "0 1rem"}} src={info}/>
              </div>
              <div>
                <Input.Copy error={error} label={"Verification code"}  value={code}/>
                {error && <Text style={{margin: "0.5rem 0 0 0.5rem"}} size={1}>{error}</Text>}
              </div>
              <div style={{display: "flex", alignSelf: "center"}}>
                <Button text={"Back"} primary style={{marginTop: "4rem", marginRight: "1rem", alignSelf: "center"}} onClick={() => {setError(null); history.push("/link");}}/>

                <Button text={"Verify"} primary style={{marginTop: "4rem", alignSelf: "center"}} onClick={verifySummonerAccount}/>
              </div>

            </Route>
            <Route path="/link">
              <Input.Text error={error} fwdRef={summonerRef} label={"Account Name"} style={{width: "480px"}} placeholder={"Summoner name"}/>
              {error && <Text style={{margin: "0.5rem 0 0 0.5rem"}}>{error}</Text>}
              <Button text={"Look Up"} primary style={{marginTop: "4rem", alignSelf: "center"}} onClick={lookUpSummoner}/>
            </Route>
          </Switch>

        </Container>
        
        
      
      </CenterDiv>
      <Line color={"#DA9526"} top={"10vw"} right={"-40vw"} style={{transform: "rotate(45deg)"}}/>
      <Line color={"#001AFF"} top={"10vw"} right={"-45vw"} style={{transform: "rotate(45deg)"}}/>
      <Line color={"#DA9526"} bottom={"10vw"} left={"-40vw"} style={{transform: "rotate(45deg)"}}/>
      <Line color={"#001AFF"} bottom={"10vw"} left={"-45vw"} style={{transform: "rotate(45deg)"}}/>
    </Page>
  )
}

export default LinkLeague