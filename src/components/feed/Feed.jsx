import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);


  useEffect(() => {
   

      const fetchPost = async () => {
        function containsNumbers(username) {
          return /\d/.test(username);
        }
        if (username) {
        const res = containsNumbers(username)
          ? await axios.get(`/post/profile/all?userId=${username}`)
          : await axios.get(`/post/profile/all?username=${username}`);

        await setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );

          
        } else {
          const res = await axios.get(`/post/timeline/${user._id}`)


          await setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        }
      };
      fetchPost();
 
  }, [username, user]);


  return (
    <div className="feed">
      <div className="feedWrapper">
        {username !== user.username && <Share />}
        {posts.map((data) => {
          return <Post key={data._id} post={data} />;
        })}
      </div>
    </div>
  );
}
