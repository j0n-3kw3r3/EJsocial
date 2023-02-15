import './closeFriends.css';

export default function CloseFriends({ user }) {
      const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="friend">
      <img src={PF + user.profilePicture} alt="" className="friendImg" />
      <span className="friendName">{user.username}</span>
    </li>
  );
}
