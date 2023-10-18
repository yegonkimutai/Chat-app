import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './components/Login';

firebase.initializeApp({
  apiKey: "AIzaSyCed6DcmHQyinbhFeddaSv5AFjHu9WuSHw",
  authDomain: "chat-app-e09a3.firebaseapp.com",
  projectId: "chat-app-e09a3",
  storageBucket: "chat-app-e09a3.appspot.com",
  messagingSenderId: "213841993729",
  appId: "1:213841993729:web:89c605e3483e566dfaa000",
  measurementId: "G-FL6H5D5MNF"
})

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header className="App-header">
       
      </header>
      <section>
        {user ? <ChatRoom /> : <Login />}
      </section>
    </div>
  );
}

const signOut = () => {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}

export default App;
