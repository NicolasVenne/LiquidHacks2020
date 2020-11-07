import React from "react";
import Landing from './pages/landing'
import Layout from './components/layout'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



export default function App() {
  return (
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
          
          
          <Route path="/">
            <Landing/>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
