import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';
import axios from 'axios';

function Card({
  id,
  title,
  imageUrl,
  price,
  onPlus,
  cartItems = [],
  loading = false,
  favorited = false,
}) {
  // Проверяем, есть ли этот конкретный ID в корзине
  const isAdded = cartItems.some((obj) => Number(obj.id) === Number(id));
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
  };

  const onClickFavorite = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('Пожалуйста, войдите в аккаунт, чтобы сохранять избранное');
        return;
      }
      // Отправляем запрос на наш новый эндпоинт
      const res = await axios.post(
        `http://127.0.0.1:8000/api/favorites/${id}/toggle/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      // Обновляем иконку только если запрос прошел успешно
      setIsFavorite(res.data.is_favorite);
    } catch (err) {
      console.error('Ошибка при смене статуса избранного', err);
    }
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={260}
          height={280}
          viewBox='0 0 255 280'
          backgroundColor='#797979d6'
          foregroundColor='#ecebeb'
        >
          <rect x='0' y='2' rx='10' ry='10' width='170' height='170' />
          <rect x='0' y='196' rx='0' ry='0' width='200' height='25' />
          <rect x='0' y='234' rx='0' ry='0' width='72' height='14' />
          <rect x='0' y='256' rx='0' ry='0' width='72' height='16' />
          <rect x='170' y='240' rx='10' ry='10' width='30' height='30' />
        </ContentLoader>
      ) : (
        <>
          <div
            className={`${styles.favorite} ${isFavorite ? styles.favorited : ''}`}
            onClick={onClickFavorite}
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

          <img width={160} height={180} src={imageUrl} alt={title} />
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
        </>
      )}
    </div>
  );
}
export default Card;
