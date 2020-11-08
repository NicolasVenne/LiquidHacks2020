import React, {useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useFirebase, useUser } from '../context/firebase';
import Loading from './loading';

function PrivateRoute({ component: Component, ...rest }) {
  const user = useUser();
  console.log(user, "ROUTER")
  return(
    <Route
      {...rest}
      render={props =>{
        if(user === null) {
          return <Loading/>
        } else if(user && user.id !== undefined) {
          return  <Component {...props} />
        } else if(user && user.state === "CONNECT_LEAGUE") {
          return <Redirect to="/link"/>
        } else {
          return <Redirect to="/login" />
        }
      }
      }
    />
  );
}

export default PrivateRoute;