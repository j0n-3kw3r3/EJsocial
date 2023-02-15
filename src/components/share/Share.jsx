import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import CancelIcon from '@mui/icons-material/Cancel';

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const filename =  file.name;
      data.append("file", file);
      data.append("name", filename);
      newPost.img = filename;
      setFile()
    
      try {
        await axios.post("/upload", data);
          window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }

    try {
      
      if (newPost.desc || file) { 
        await axios.post("/post", newPost);
        
      }
    } catch (error) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="top">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="shareImg"
          />
          <input
            type="text"
            className="shareInput"
            placeholder={`What's on your mind ${user.username}`}
            ref={desc}
          />
        </div>

        <hr className="shareHr" />
        {
          file && (
            <div className="shareImgContainer" >
        <img src={URL.createObjectURL(file)} alt="" className="shareImage" />
        <CancelIcon className="shareCancelImg" onClick={()=>setFile(null)} />

      </div>
          )
        }
        <div className="buttom">
          <form className="shareButtom" onSubmit={submitHandler}>
            <label htmlFor="file" className="shareOptions">
              <div className="shareOption">
                <PermMediaIcon htmlColor="tomato" className="icon" />
                <span className="shareOptionText">Photo or video</span>
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept=".png, .jpeg, .jpg"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </label>
            <div className="shareOptions">
              <div className="shareOption">
                <LabelIcon htmlColor="blue" className="icon" />
                <span className="shareOptionText">Tag</span>
              </div>
            </div>
            <div className="shareOptions">
              <div className="shareOption">
                <RoomIcon htmlColor="green" className="icon" />
                <span className="shareOptionText">Location</span>
              </div>
            </div>
            <div className="shareOptions">
              <div className="shareOption">
                <EmojiEmotionsIcon htmlColor="goldenrod" className="icon" />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <button className="shareButton" type="submit">
              Share
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
