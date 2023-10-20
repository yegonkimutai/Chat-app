import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const FirebaseConfig = () => {
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
     
  return getDatabase(app);
}

export default FirebaseConfig
