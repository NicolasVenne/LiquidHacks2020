import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/button';
import Heading from '../components/heading'
import Input from '../components/input';
import Line from '../components/line'
import StepCircle from '../components/step-circle';
import Text from "../components/text";
import rightArrow from "../assets/right-arrow.svg"
import info from "../assets/info.svg"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link
} from "react-router-dom";

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
  

  useEffect(() => {
    const listen = history.listen((location) => {
      setPath(location.pathname)
    })

    return () => {
      listen();
    }
  },[])
  

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
              <Text size={1.25} style={{marginTop: "1.25rem"}}>Link summoner <i>Renelius</i> to your account?</Text>
              <div style={{display: "flex", alignSelf: "center"}}>
                <Button text={"Back"} primary style={{marginTop: "4rem", marginRight: "1rem", alignSelf: "center"}} onClick={() => {history.push("/link");}}/>

                <Button text={"Link"} primary style={{marginTop: "4rem", alignSelf: "center"}} onClick={() => {}}/>
              </div>

            </Route>
            <Route path="/link/verify">
              <Text size={2}>Awesome, we found you!</Text>
              <Text size={1.25} style={{marginTop: "1.25rem"}}>We need to verify your summoner: <i>Renellius</i></Text>
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
                <Input.Copy label={"Verification code"}  value={"1231231sdfsdfsdfsdsd"}/>
              </div>
              <Button text={"Verify"} primary style={{marginTop: "4rem", alignSelf: "center"}} onClick={() => {history.push("/link/confirm"); }}/>

            </Route>
            <Route path="/link">
              <Input.Text label={"Account Name"} style={{width: "480px"}} placeholder={"Summoner name"}/>
              <Button text={"Look Up"} primary style={{marginTop: "4rem", alignSelf: "center"}} onClick={() => {history.push("/link/verify"); }}/>
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