import React from 'react';
import styles from './Card.module.scss';

function Card({ title, imageUrl, price, onFavorite, onPlus }) {
  /*const onButton = () => {
    alert(props.title);
  };*/
  const [isAdded, setIsAdded] = React.useState(false);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded); //при клике будетсмена с + на "галочку". И на оборот.
  };

  /*React.useEffect(() => {
    console.log('Переменная изменилась!');
  }, [isAdded]); //следит за тем как изменился код
  // */

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite} aria-label='Like' role='button'>
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={styles.heart}
        >
          <path
            d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
         4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
         14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
         6.86-8.55 11.54L12 21.35z'
            fill='currentColor'
          />
        </svg>
      </div>

      <img width={160} height={180} src={imageUrl} alt='Rose red' />
      <h5>{title}</h5>

      <div className={styles._blok}>
        <div className={styles.__text}>
          <span>Цена: </span>
          <b>{price} руб.</b>
        </div>

        <img
          width={30}
          height={30}
          onClick={onClickPlus}
          src={isAdded ? '/img/btn-checked.png' : '/img/btn-plus.png'}
          alt='Plus'
        />
      </div>
    </div>
  );
}
export default Card;
