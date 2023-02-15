import './sideBar.css';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import { Users } from "../../dummyData";
import CloseFriends from '../closeFriends/CloseFriends';



export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chat</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleOutlinedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Video</span>
          </li>
          <li className="sidebarListItem">
            <GroupIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Group</span>
          </li>
          <li className="sidebarListItem">
            <BookmarkIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutlineIcon className="sidebarIcon" />
            <span className="sidebarListItemText">jobs</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
        </ul>
        <button className="sidebarButton">Show more...</button>
        <hr className="sidebarHr" />
        <ul className="friendlist">
                  {
                      Users.map((user) => {
                          return <CloseFriends key={user.id} user={user} />
                      }
                      )
                  }
        </ul>
      </div>
    </div>
  );
}
