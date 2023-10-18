import React, { useRef, useState } from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ChatRoom = () => {
    const dummy = useRef()
    const ref = firestore.collection('messages')
    const query = ref.orderBy('createdAt').limit(25)

    const [messages] = useCollectionData(query, {idField: 'id'})

    const [value, setValue] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault()

        const { uid } = auth.currentUser

        await ref.add({
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid
        })

        setValue('')
        dummy.current.scrollIntoView({ behavior: 'smooth' })
    }

  return (
   <>
   <main>
    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
   </main>
   </>
  )
}

const ChatMessage = (props) => {
    const { text, uid } = props.messages

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

    return (
        <div className={`message ${messageClass}`}>
            <p>{text}</p>
        </div>
    )
}

export default ChatRoom