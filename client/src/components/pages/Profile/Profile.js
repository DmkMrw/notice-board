import { useSelector } from "react-redux";
import { getUser } from "../../../redux/usersRedux";

const Profile = () => {

  const userInfo = useSelector(getUser)

  return (
    <>
      <h1>Profile info</h1>
      <h2>Login: {userInfo.login}</h2>
    </>

  );
}

export default Profile;