import './App.css';
import React, { useRef, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import 'firebase/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './components/Login';
import { addDoc, serverTimestamp, collection, getDocs, getFirestore } from 'firebase/firestore'; // Import firestore from Firebase

const fireConfig = {
  apiKey: "AIzaSyCed6DcmHQyinbhFeddaSv5AFjHu9WuSHw",
  authDomain: "chat-app-e09a3.firebaseapp.com",
  databaseURL: 'https://chat-app-e09a3-default-rtdb.firebaseio.com/',
  projectId: "chat-app-e09a3",
  storageBucket: "chat-app-e09a3.appspot.com",
  messagingSenderId: "213841993729",
  appId: "1:213841993729:web:89c605e3483e566dfaa000",
  measurementId: "G-FL6H5D5MNF"
}

const app = initializeApp(fireConfig)
const database = getFirestore(app);
const auth = getAuth()

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

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender === 'user' ? 'sent' : 'received'}`}>
      <p>{text}</p>
    </div>
  );
};


const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const messagesRef = collection(database, 'messages');
    const [value, setValue] = useState('')


    const sendMessage = async (e) => {
      e.preventDefault()

      const { uid } = auth.currentUser

      try {
        await addDoc(messagesRef, {
          text: value,
          createdAt: serverTimestamp(),
          uid
      })

      setValue('')
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  
    useEffect(() => {
      // Fetch messages from Firebase Realtime Database
      getDocs(messagesRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setMessages(Object.values(data));
          }
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
        });
    }, []); // Run this effect only once when the component mounts
  
    return (
      <div className="chat-room">
        {messages.map((message, index) => (
          <Message
            key={index}
            text={message.text}
            sender={message.sender} // You should adjust this based on your data structure
          />
        ))}
        <form onSubmit={sendMessage}>
    <input value={value} onChange={(e) => setValue(e.target.value)}/>

    <button type='submit'>Send</button>
   </form>
      </div>
    );
  };

const signOut = () => {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}>Sign out</button>
  )
}

export default App;
