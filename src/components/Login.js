import React from 'react'
import 'firebase/auth';
import firebase from 'firebase/app';

const Login = () => {
    const signIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)

    }

  return (
    <button onClick={signIn}>Sign in with google</button>
  )
}

export default Login