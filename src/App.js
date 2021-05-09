import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Button from "./components/Button";
import Channel from "./components/Channel";

firebase.initializeApp({
  apiKey: "AIzaSyCWlVDsk9wOAKaG2EnAdrwOd7fENaFEoPw",
  authDomain: "chat-app-react-4de60.firebaseapp.com",
  projectId: "chat-app-react-4de60",
  storageBucket: "chat-app-react-4de60.appspot.com",
  messagingSenderId: "1075986917369",
  appId: "1:1075986917369:web:4d1a78081d2602d888bf28",
});

const auth = firebase.auth();
const db = firebase.firestore();

const App = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  });

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();

    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return "Loading...";

  return (
    <div>
      {user ? (
        <>
          <header>
            <Button onClick={signOut} className="signout">
              Sign out
            </Button>
          </header>
          <Channel user={user} db={db} />
        </>
      ) : (
        <section className="sign-in">
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        </section>
      )}
    </div>
  );
};

export default App;
