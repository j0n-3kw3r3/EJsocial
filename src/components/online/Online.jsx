import './online.css';

export default function Online({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div>
      <li className="barFriend">
        <div className="barProfileContainer">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="profileImg"
          />
          <span className="rbOnline"></span>
        </div>
        <div className="rbUsername">{user.username}</div>
      </li>
    </div>
  );
}
