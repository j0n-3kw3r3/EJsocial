import axios from 'axios';
import { useEffect, useState } from 'react';
import  './conversations.css';

export default function Conversations({ data, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState();
  const friendId = data.members.find((u) => u !== currentUser._id);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const res = await axios.get(`/user?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchUser();
  }, [friendId]);

  return (
    <div className="conversations">
      <img
        src={
                  user?.profilePicture
                    ? PF + user?.profilePicture
                    :PF + "person/noAvatar.png"}
        className="conversationImg"
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
