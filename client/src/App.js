import React, { useEffect } from "react";
import Landing from './pages/landing'
import Layout from './components/layout'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import LinkLeague from "./pages/link-league";
import { ThemeProvider } from "styled-components";
import { AuthContext } from "./context/auth";
import { Firebase, FirebaseContext } from "./context/firebase";
import PrivateRoute from "./components/private-route";
import Loading from "./components/loading";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Home from "./pages/home";

const client = new ApolloClient({
  uri: 'http://192.168.0.7:3001/api',
  cache: new InMemoryCache()
});


const theme = {
  color: {
    primary: "#DA9526",
    secondary: "#001AFF"
  }
}
const firebase = new Firebase();
export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  
  if(urlParams.get("token")) {
    firebase.doSignInWithCustomToken(urlParams.get("token")).then((e) => {
    }).catch((e) => {
      console.log(e);
    })
  } 
  return (
    <AuthContext.Provider value={false}>
      <FirebaseContext.Provider value={firebase}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Router>
              <Layout>
                {/* <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/users">Users</Link>
                    </li>
                  </ul>
                </nav> */}

                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                  <Route path="/link" component={LinkLeague}/>
                  <Route path="/login" component={Landing}/>
                  <Route exact path="/logout" component={() => {firebase.doSignOut(); return <Redirect to="/login"/> }}/>
                  <PrivateRoute exact path="/" component={Home}/>
                </Switch>
              </Layout>
            </Router>
          </ThemeProvider>
        </ApolloProvider>
      </FirebaseContext.Provider>
    </AuthContext.Provider>
  );
}
