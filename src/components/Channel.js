import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase/app";
import Message from "./Message";
import userEvent from "@testing-library/user-event";

const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { uid, displayName, photoURL } = user;

  const messagesContainer = useRef(null);

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySanpshot) => {
          const data = querySanpshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setMessages(data);
        });

      return unsubscribe;
    }
  }, [db]);

  useEffect(() => {
    if (messages.length > 0)
      messagesContainer.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
    }

    setNewMessage("");
  };
  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      <ul className="messages">
        {messages.map((message) => {
          return (
            <Message
              key={message.id}
              {...message}
              isUser={message.uid === user.uid}
            />
          );
        })}
        <div
          style={{ float: "left", clear: "both" }}
          ref={messagesContainer}
        ></div>
      </ul>
      <form onSubmit={handleOnSubmit} className="text-input">
        <div className="text-input__container">
          <input
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
          />
          <button className="text-input__container__send">Send</button>
        </div>
      </form>
    </>
  );
};

export default Channel;
