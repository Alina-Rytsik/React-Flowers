function Drawer({ onClose, items = [] }) {
  return (
    <div className='overlay'>
      <div className='drawer'>
        <h2>
          Корзина <img onClick={onClose} src='/img/closeCard.png' alt='Close' />
        </h2>

        <div className='items'>
          {items.map((obj) => (
            <div className='cartItem'>
              <div
                className='img'
                style={{
                  backgroundImage: `url(${obj.imageUrl})`,
                  backgroundSize: 'cover',
                }}
              ></div>

              <div>
                <p>{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>

              <img className='imgCross' src='img/cross-off.png' alt='Cross off' />
            </div>
          ))}
        </div>

        <div className='cartTotalBlock'>
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>25,70 руб.</b>
            </li>
          </ul>

          <button className='greenBtn'>
            Оформить заказ <img src='/img/right-arrow.png' alt='Right arrow' />{' '}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
