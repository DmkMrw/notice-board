import styles from './CardBox.module.scss';
import { IMGS_URL } from '../../../config';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getUser } from '../../../redux/usersRedux';


function CardBox({ location, price, title, _id, image, user }) {

  const loggedUser = useSelector(getUser);

  return (
    <>
      <div className={styles.card_wrapper}>
        <div className={styles.img_wrapper}>
          <img src={IMGS_URL + image} alt="" />
        </div>
        <div className={styles.description_all}>
          <span className={styles.title}>{title}</span>
          <div className={styles.loc_price}>
          {loggedUser !== null && loggedUser.login === user && <p className={styles.logged_info}>Its your advertisement</p>}

            <span className={styles.location}>Location: <span>{location}</span></span>

            <span className={styles.price}>${price}</span>
            <Link to={'ad/' + _id}>
              <button className={styles.button}>Read More</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardBox;