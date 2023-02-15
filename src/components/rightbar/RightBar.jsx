import "./rightBar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import RemoveIcon from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function RightBar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState();
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  useEffect(() => {
    return () => {
      const getFriends = async () => {
        try {
          const friendList = currentUser
            ? await axios.get(`/user/friends/${currentUser._id}`)
            : await axios.get(`/user/friends/${user._id}`);

          setFriends(friendList.data);
        } catch (err) {
          console.log(err);
        }
      };
      getFriends();
    };
  }, [user, currentUser]);


  const followHandler = async () => {
    try {
      if (followed) {
        await axios.put("/user/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put("/user/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };
  const HomeRightBar = () => {
    return (
      <>
        <div className="RBcontainer">
          <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
          <span className="bdText">
            <b>Ekwere John </b> and <b> 3 others friends</b> have a birthday
            today
          </span>
        </div>
        <img src={`${PF}ad.png`} alt="" className="barAds" />
        <h2 className="barTitle">Online Friends</h2>
        <ul className="barFriendList">
          {friends?.map((user) => {
            return <Online key={user._id} user={user} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        {user.username !== currentUser.username && (
          <button className="follow" onClick={followHandler}>
            {followed ? "UnFollow" : "Follow"}
            {followed ? <RemoveIcon /> : <Add />}
          </button>
        )}

        <h4 className="rightBarTitle">User information</h4>
        <div className="RBinfo">
          <div className="RBInfoItem">
            <span className="RBInfoKey">City:</span>
            <span className="RBInfoValue">{user.city}</span>
          </div>
          <div className="RBInfoItem">
            <span className="RBInfoKey">From:</span>
            <span className="RBInfoValue">{user.from}</span>
          </div>
          <div className="RBInfoItem">
            <span className="RBInfoKey">Relationship:</span>
            <span className="RBInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Realationship"
                : user.relationship === 3
                ? "Mixed"
                : ""}
            </span>
          </div>
          <h4 className="rightBarTitle">User friends</h4>
          <div className="RBFollowings">
            {friends?.map((friend) => {
              return (
                <Link
                  to={`/profile/${friend.username}`}
                  style={{ textDecoration: "none" }}
                  key={friend._id}
                >
                  <div className="RBFollowing" key={friend._id}>
                    <img
                      src={
                        friend.profilePicture
                          ? PF + friend.profilePicture
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                      className="RBFollowingImg"
                    />
                    <span className="RBFollowingName">{friend.username}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightBar">
      <div className="profileWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
