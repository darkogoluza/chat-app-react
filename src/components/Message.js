import React from "react";
import { formatRelative } from "date-fns";

const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
  isUser,
}) => {
  return (
    <li className={`messages__message ${isUser && "messages__message--user"}`}>
      {photoURL && <img src={photoURL} alt="Avatar" />}
      <div className="messages__message__content">
        {displayName && (
          <p className="messages__message__content__name">{displayName}</p>
        )}
        <p className="messages__message__content__text">{text}</p>
        {createdAt?.seconds && (
          <p className="messages__message__content__date">
            {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
          </p>
        )}
      </div>
    </li>
  );
};

export default Message;
