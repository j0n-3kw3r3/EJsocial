import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  

  useEffect(() => {
    return () => {
      setIsLiked(post.likes.includes(currentUser._id))
    };
  }, [currentUser._id, post.likes]);
  
  useEffect(() => {
    return () => {
      const fetchUser = async () => {
        const res = await axios.get(`/user?userId=${post.userId}`);
        setUser(res.data);
      };
      fetchUser();
    };
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(`/post/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {}
    setIsLiked(!isLiked);
    setLike(isLiked ? like - 1 : like + 1);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.userId}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="text">{post?.desc}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              alt=""
              className="like"
              onClick={likeHandler}
            />
            <img
              src={`${PF}heart.png`}
              alt=""
              className="like"
              onClick={likeHandler}
            />
            <span className="likeCounter">
              {like} {like > 1 ? "people" : "person"} liked it
            </span>
          </div>
          <div className="postBottomRight">
            <span className="commentText">
              {post.comment} {post.comment > 1 ? "comments" : "comment"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
