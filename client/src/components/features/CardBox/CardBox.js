import styles from './CardBox.module.scss';
import logo from '../../../images/logo192.png';
import test from '../../../images/test.jpg';
import { IMGS_URL } from '../../../config';

function CardBox({ description, info, location, price, title, _id, image }) {

  return (
    <>
      <div className={styles.card_wrapper}>
        <div className={styles.img_wrapper}>
          <img src={IMGS_URL + image} alt="" />
        </div>
        <div className={styles.description_all}>
          <span className={styles.title}>{title}</span>
          <p className={styles.description}>{description}</p>
          <span className={styles.location}>Location: <span>{location}</span></span>
          <span className={styles.price}>${price}</span>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </>
  );
}

export default CardBox;