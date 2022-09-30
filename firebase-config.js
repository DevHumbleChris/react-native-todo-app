import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyASHNli2lmCoaZ2YTKLPnmeq_jNVvElj78",
  authDomain: "todo-app-react-native-81d4f.firebaseapp.com",
  databaseURL: "https://todo-app-react-native-81d4f-default-rtdb.firebaseio.com",
  projectId: "todo-app-react-native-81d4f",
  storageBucket: "todo-app-react-native-81d4f.appspot.com",
  messagingSenderId: "181639945891",
  appId: "1:181639945891:web:8d47ac50389fc5a6fb6916"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export { db }