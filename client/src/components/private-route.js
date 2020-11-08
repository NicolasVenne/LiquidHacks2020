import React, {useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useFirebase, useUser } from '../context/firebase';
import Loading from './loading';

function PrivateRoute({ component: Component, ...rest }) {
  const user = useUser();
  return(
    <Route
      {...rest}
      render={props =>{
        if(user === null) {
          return <Loading/>
        } else if(user) {
          return  <Component {...props} />
        } else {
          return <Redirect to="/login" />
        }
      }
      }
    />
  );
}

export default PrivateRoute;