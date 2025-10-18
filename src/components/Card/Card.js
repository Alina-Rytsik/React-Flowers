import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

function Card({ id, title, imageUrl, price, onPlus, cartItems = [] }) {
  // Добавлен prop cartItems (по умолчанию пустой массив)
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  // Синхронизируем isAdded с состоянием корзины
  React.useEffect(() => {
    const isInCart = cartItems.some((cartItem) => Number(cartItem.itemId) === Number(id));
    console.log(
      `useEffect for Card id=${id}: isInCart=${isInCart}, cartItems.length=${cartItems.length}`,
    ); // Лог для отладки
    setIsAdded(isInCart);
  }, [cartItems, id]);

  const onClickPlus = async () => {
    // Сделаем async, чтобы дождаться onPlus
    console.log(`Clicked plus for id=${id}, current isAdded=${isAdded}`); // Лог для отладки
    setIsAdded(!isAdded); // Оптимистичное обновление: сразу меняем иконку
    try {
      await onPlus({ id, title, imageUrl, price }); // Ждём завершения onAddToCart
      // После await cartItems обновится, useEffect скорректирует, если нужно
    } catch (error) {
      console.error('Error adding/removing item:', error);
      setIsAdded(!isAdded); // Откат, если ошибка
    }
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite); //при клике будетсмена с серого сердца на розовое. И на оборот.
  };

  /*React.useEffect(() => {
    console.log('Переменная изменилась!');
  }, [isAdded]); //следит за тем как изменился код
  // */

  return (
    <div className={styles.card}>
      <div
        className={`${styles.favorite} ${isFavorite ? styles.favorited : ''}`}
        onClick={onClickFavorite}
        aria-label='Like'
        role='button'
      >
        <svg className={styles.heart} viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
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
