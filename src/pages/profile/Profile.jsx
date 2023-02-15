import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import RightBar from "../../components/rightbar/RightBar";
import SideBar from "../../components/sidebar/SideBar";
import Feed from "../../components/feed/Feed";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const [user, setUser] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const username = useParams().username;

  useEffect(() => {
 
      const fetchUser = async () => {
        function containsNumbers(username) {
          return /\d/.test(username);
        }
        const res = containsNumbers(username) ?
        await axios.get(`/user?userId=${username}`):
          await axios.get(`/user?username=${username}`)
          ;
        setUser(res.data);
      };
      fetchUser();
  
  }, [username]);

  console.log(user)

  return (
    <>
      <Topbar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="rightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "post/noCover.png"
                }
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="profilePictureImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="infoName">{user.username}</h4>
              <span className="infoDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="rightBottom">
            <Feed username={username} />
            <RightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
