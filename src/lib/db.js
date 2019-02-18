import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyA-UZ7mRqhaiaqzDg9L0h3xUYyOlJI79Ck",
  authDomain: "react-cart-ab25c.firebaseapp.com",
  databaseURL: "https://react-cart-ab25c.firebaseio.com",
  projectId: "react-cart-ab25c",
  storageBucket: "",
  messagingSenderId: "876539563481"
};
const f = firebase.initializeApp(config);

export const db = f.firestore();

export default db;
