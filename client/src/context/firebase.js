import app from 'firebase/app';
import 'firebase/auth';
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

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

export function useUser() {
  const [user, setUser] = useState(null);
  const firebase = useFirebase();

  useEffect(() => {
    const listener = firebase.onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
      } else {
        setUser(false);
      }
    })

    return () => {
      listener();
    }
  })

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

  getUser =  () => this.auth.currentUser

  isLoggedIn =  () => this.auth.currentUser !== null

  doSignOut = async () => this.auth.signOut()


}