import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
    const auth = getAuth()
    const signIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user
            console.log('User signed in:', user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Sign-in error:', errorCode, errorMessage);
          });
    }

  return (
    <button className='sign-in' onClick={signIn}>Sign in with google</button>
  )
}

export default Login