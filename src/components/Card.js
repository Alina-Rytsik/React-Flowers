function Card() {
  return (
    <div className='card'>
      <div className='favorite'>
        <img src='/img/heart-unliked.png' alt='Unliked' />
      </div>

      <img width={130} height={150} src='img/rose/red rose.jpg' alt='Rose red' />
      <h5>Роза “КРАСНАЯ” цветок срезанный (1шт.)</h5>

      <div className='_blok'>
        <div className='__text'>
          <span>Цена: </span>
          <b>1,99 руб.</b>
        </div>

        <button className='button'>
          <img width={11} height={11} src='/img/btn-plus.png' alt='Plus' />
        </button>
      </div>
    </div>
  );
}
export default Card;
