import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <span className={styles.span_footer}>Copyright <span dangerouslySetInnerHTML={{"__html":"&copy;"}}></span> DmkMrw</span>

    </div>
  );
}

export default Footer;