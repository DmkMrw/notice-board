import { useSelector } from "react-redux";
import { IMGS_URL } from '../../../config';
import { getUserData } from "../../../redux/userRedux";
import styles from './Profile.module.scss';


const Profile = () => {

const data = useSelector(getUserData);
const {login, phoneNumber, avatar} = data

  return (
    <div className={styles.container}>
      <p className={styles.title}>Profile info</p>
      <div className={styles.avatar}>
        <img src={IMGS_URL + avatar} alt="your_avatar" />
      </div>
      <p className={styles.login}>Hello <span className={styles.user_data}>{login}!</span></p>
      <p className={styles.phone}>Phone number: <span className={styles.user_data}>{phoneNumber}</span></p>
    </div>


  );
}

export default Profile;