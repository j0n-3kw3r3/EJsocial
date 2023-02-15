import "./topbar.css";
import PersonIcon from "@mui/icons-material/Person";
import Notifications from "@mui/icons-material/Notifications";
import Chat from "@mui/icons-material/Chat";
import Search from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topBarContainer">
      <div className="topBarLeft">
        <Link to="/" className="Link">
          <span className="logo">Billions Social</span>
        </Link>
      </div>

      <div className="topBarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            type="text"
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>

      <div className="topBarRight">
        <div className="topBarLinks">
          <Link to="/" className="Link">
            <span className="topBarLink">Home</span>
          </Link>
          <Link to="/" className="Link">
            <span className="topBarLink">Timeline</span>
          </Link>
        </div>
        <div className="icons">
          <div className="topBarIconItem">
            <PersonIcon />
            <span className="topBarIconBadge">6</span>
          </div>
          <div className="topBarIconItem">
            <Chat />
            <span className="topBarIconBadge">12</span>
          </div>
          <div className="topBarIconItem">
            <Notifications />
            <span className="topBarIconBadge">56</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topBarImg"
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
