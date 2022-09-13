import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './CardBox.module.scss';
import logo from '../../../images/logo192.png'

function CardBox() {
  return (
    <>
      <div className={styles.card_wrapper}>
        <div className={styles.img_wrapper}>
          <img src={logo} alt="" />
        </div>
        <div className={styles.description_all}>
          <span className={styles.price}>Title</span>
          <p className={styles.description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
          <span className={styles.location}>Location: Cieszyn</span>
          <button className={styles.button}>Read More</button>
        </div>

      </div>
    </>
  );
}

export default CardBox;