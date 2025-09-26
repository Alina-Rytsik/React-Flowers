import styles from './footer.module.scss';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLeft}>
        <h3>Lilu Flowers</h3>
        <p>г. Гомель, Площадь Ленина 41</p>
      </div>

      <div className={styles.footerRight}>
        <ul className={styles.socialIcons}>
          <li>
            <img
              className={styles.icon}
              width={30}
              height={30}
              src='img/instagram.png'
              alt='Instagram'
            />
          </li>
          <li>
            <img
              className={styles.icon}
              width={30}
              height={30}
              src='img/telegram.png'
              alt='Telegram'
            />
          </li>
          <li>
            <img className={styles.icon} width={30} height={30} src='img/vk.png' alt='VK' />
          </li>
        </ul>

        <p>8-232-340-76-95</p>
        <p>lilu_flowers@mail.ru</p>
      </div>
    </div>
  );
}

export default Footer;
