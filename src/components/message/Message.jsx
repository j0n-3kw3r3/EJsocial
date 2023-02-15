import axios from "axios";
import { useEffect, useState } from "react";
import "./message.css";
import { format } from "timeago.js";

export default function Message({ own, message }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/user?userId=${message.sender}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [message]);
  
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src={
            user?.profilePicture
              ? PF + user?.profilePicture
              : PF + "person/noAvatar.png"
          }
          className="messageImg"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>

      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
