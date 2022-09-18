import styles from './CardBox.module.scss';
import { IMGS_URL } from '../../../config';
import { Link } from 'react-router-dom';


function CardBox({ description, info, location, price, title, _id, image }) {





  return (
    <>
      <div className={styles.card_wrapper}>
        <div className={styles.img_wrapper}>
          <img src={IMGS_URL + image} alt="" />
        </div>
        <div className={styles.description_all}>
          <span className={styles.title}>{title}</span>
          <div className={styles.loc_price}>
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