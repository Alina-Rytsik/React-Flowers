import styles from './call.module.scss';

function Call() {
  return (
    <div className={styles.noChoice}>
      <div className={styles.line}></div>
      <h2>Не смогли выбрать?</h2>
      <p>
        Не проблема! Мы подберем букет по вашему индивидуальному запросу. <br />
        Закажите звонок и мы перезвоним вам в течение 5 минут.
      </p>
      <button className={styles.btnCall} aria-label='Заказать звонок'>
        Заказать звонок
      </button>
    </div>
  );
}

export default Call;
