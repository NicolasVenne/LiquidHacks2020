import app from 'firebase/app';
import 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { createContext, useContext } from 'react';
import {   useLazyQuery, gql } from '@apollo/client';


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
  query GetUserInfo($id: String!) {
    userAccount(id: $id) {
      id
    }
  }
`;

export const useUser = () => {
  const firebase = useFirebase();
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.getUser((user) => {
      setUser(user)
    })
  })

  return user
}


export class Firebase {
  constructor(client) {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.listeners = [];
    this.auth = app.auth();
    this.auth.onAuthStateChanged((_user) => {
      if(_user) {
        // _user.getIdTokenResult().then((v) => console.log(v))
        if(!this.user) {
          this.loadAccessToken();
          client
          .query({
            query: gql`
              query GetUserInfo($id: String!) {
                userAccount(id: $id) {
                  id
                }
              }
            `,
            variables: {
              id: _user.uid
            }
          })
          .then(result => {
            this.user = result.data.userAccount
            for(let i = 0; i < this.listeners.length; i++) {
              this.listeners[i](this.user);
            }
          }).catch((err) => {
          });
          // getUser({variables: {id: "1"}})
        }
      } else {
        for(let i = 0; i < this.listeners.length; i++) {
          this.listeners[i](false);
        }
      }
    })
  }

  getUser = (cb) => {
    if(this.user) {
      cb(this.user);
    } else {
      this.listeners.push(cb);
    }
    
  }

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


  isLoggedIn =  () => this.auth.currentUser !== null

  doSignOut = () => {
    console.log("SIGN OUT")
    return this.auth.signOut()
  }


}