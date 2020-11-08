import app from 'firebase/app';
import 'firebase/auth';
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { useLazyQuery, gql } from '@apollo/client';


export const FirebaseContext = createContext();

const firebaseConfig = {
  apiKey: "AIzaSyC8q9hnMZ3n0N20v-bjLZ03pjN6a-5PnRo",
  authDomain: "scrim-of-legends.firebaseapp.com",
  databaseURL: "https://scrim-of-legends.firebaseio.com",
  projectId: "scrim-of-legends",
  storageBucket: "scrim-of-legends.appspot.com",
  messagingSenderId: "635366628964",
  appId: "1:635366628964:web:04c5ef044e3d77794f8971",
  measurementId: "G-8EGMPHPKHH"
};

export function useFirebase() {
  return useContext(FirebaseContext);
}


const USER_ACCOUNT = gql`
  query GetUserInfo($id: ID!) {
    userAccount(id: $id) {
      id
      leagueAccount {
        name
        rank {
          tier
          rank
        }
      }
    }
  }
`;


export function useUser() {
  const [user, setUser] = useState(null);
  const firebase = useFirebase();
  const [getUser, {loading, error, data}] = useLazyQuery(USER_ACCOUNT)

  
  useEffect(() => {
    if(data) {
      setUser(data);
    }
    if(error ) {
      setUser({state: "CONNECT_LEAGUE"});
    }
  }, [loading])

  useEffect(() => {
    const listener = firebase.onAuthStateChanged((_user) => {
      if(_user) {
        // _user.getIdTokenResult().then((v) => console.log(v))
        if(!user) {
          firebase.loadAccessToken();
          getUser({variables: { id: _user.uid }})

          // getUser({variables: {id: "1"}})
        }
      } else {
        setUser(false);
      }
    })

    return () => {
      setUser(null);
      listener();
    }
  }, [])

  return user;
}

export class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
  }

  onAuthStateChanged = (fn) => this.auth.onAuthStateChanged(fn)

  doSignInWithCustomToken = async (token) => {
    return this.auth.setPersistence(app.auth.Auth.Persistence.SESSION)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return this.auth.signInWithCustomToken(token)
    })
    .catch((err) => {
      console.log(err);
    })
    
  }

  loadAccessToken = () => {
    if(!this.accessToken) {
      this.auth.currentUser.getIdTokenResult().then((data) => {
        this.accessToken = data.claims.access_token
      })
    }
  }

  getDiscAccessToken = () => {
    return this.accessToken;
  }

  getUser =  () => this.auth.currentUser

  isLoggedIn =  () => this.auth.currentUser !== null

  doSignOut = () => {
    console.log("SIGN OUT")
    return this.auth.signOut()
  }


}