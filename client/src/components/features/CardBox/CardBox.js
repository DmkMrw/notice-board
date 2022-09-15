import styles from './CardBox.module.scss';
import logo from '../../../images/logo192.png'
import test from '../../../images/test.jpg'

function CardBox() {
  return (
    <>
      <div className={styles.card_wrapper}>
        <div className={styles.img_wrapper}>
          <img src={test} alt="" />
        </div>
        <div className={styles.description_all}>
          <span className={styles.title}>Title</span>
          <p className={styles.description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
          <span className={styles.location}>Location: <span>Cieszyn</span></span>
          <span className={styles.price}>$250</span>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </>
  );
}

export default CardBox;