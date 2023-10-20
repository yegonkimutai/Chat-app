import React, { useRef, useState } from 'react'
import { getAuth } from 'firebase/auth'; // Import auth from Firebase

import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore'; // Import firestore from Firebase
import 'firebase/compat/auth'; // If you're still using the compat version

import 'firebase/compat/firestore';
// import { auth, firestore } from 'firebase/app';
// import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const fireConfig = {
    apiKey: "AIzaSyCed6DcmHQyinbhFeddaSv5AFjHu9WuSHw",
    authDomain: "chat-app-e09a3.firebaseapp.com",
    projectId: "chat-app-e09a3",
    storageBucket: "chat-app-e09a3.appspot.com",
    messagingSenderId: "213841993729",
    appId: "1:213841993729:web:89c605e3483e566dfaa000",
    measurementId: "G-FL6H5D5MNF"
  }
  
  const app = initializeApp(fireConfig);
  getAuth(app);
  
  const ChatRoom = () => {
    // const dummy = useRef()
    const auth = getAuth()
    const firestore = getFirestore()

    const chatRef = collection(firestore, 'messages')
    const q = query(chatRef, orderBy('createdAt'), limit(25));

    const [messages] = useCollectionData(q, {idField: 'id'})


   

  return (
   <>
   <main>
    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
   </main>
   
   </>
  )
}

const ChatMessage = (props) => {
    const { text, uid } = props.message

    return (
            <p>{text}</p>
    )
}

export default ChatRoom