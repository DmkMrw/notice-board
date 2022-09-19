import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdById } from "../../../redux/adsRedux";
import { IMGS_URL } from '../../../config';
import { Link } from 'react-router-dom';
import styles from './AdPage.module.scss';
import { API_URL } from '../../../config';
import { useState } from "react";
import ModalDelete from "../../features/ModalDelete/ModalDelete";
import { useNavigate } from "react-router-dom";
import { getUserByLogin } from "../../../redux/userRedux";
import { getUser } from '../../../redux/usersRedux';



const AdPage = () => {

  const { adId } = useParams();
  const adData = useSelector(state => getAdById(state, adId));
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState();

  const user = useSelector(getUser)

  // const userSelector = useSelector(state => getUserByLogin(state, adData.login))
  // console.log('user', userSelector);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDelete = (e) => {
    e.preventDefault()
      const options = {
    method: 'DELETE',
    };
    fetch(API_URL + '/api/ads/' + adId, options);
    navigate('/')
  }

  fetch(API_URL + '/auth/user/' + adData.user)
    .then(res => {
      if (res.ok) {
        return res
    }
      throw Error ('this user has no avatar')
      })
    .then((res) => res.json())
    .then((user) => setAvatar(user.avatar))
    .catch(err => console.log(err))

  if (showModal) {
    return (
      <ModalDelete
        showModal={showModal}
        handleClose={handleClose}
        handleRemove={handleDelete}
      />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card_wrapper}>
        <div className={styles.img_wrapper}>
          <img src={IMGS_URL + adData.image} alt="product_image" />
        </div>
        <div className={styles.description_all}>
          <span className={styles.title}>{adData.title}</span>
          <p className={styles.description}>{adData.description}</p>
          <span className={styles.location}>Location: <span>{adData.location}</span></span>
          <span>Phone: {adData.phone}</span>
          <div className={styles.author}>
            <p>Published date: {adData.date}</p>
            {avatar && <img className={styles.avatar} src={IMGS_URL + avatar} alt="author_avatar" />}
            <p>Author: {adData.user}</p>
          </div>
          <span className={styles.price}>Price: ${adData.price}</span>
          <Link to={'/'}>
            <button className={styles.button}>Back</button>
          </Link>
          {user !== null && user.login === adData.user &&
            <button className={styles.button_delete} onClick={handleShow}>DELETE</button>
          }
        </div>
      </div>
    </div>
  );
}

export default AdPage;