import './home.css';
import RightBar from '../../components/rightbar/RightBar';
import SideBar from '../../components/sidebar/SideBar';
import Feed from '../../components/feed/Feed';
import Topbar from '../../components/topbar/Topbar';

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <SideBar />
        <Feed />
        
        <RightBar/>
      </div>
    </>
  );
}
