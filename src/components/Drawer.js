function Drawer() {
  return (
    <div className='overlay' style={{ display: 'none' }}>
      <div className='drawer'>
        <h2>
          Корзина <img className='imgCartOff' src='img/cart-off.png' alt='cart off' />
        </h2>

        <div className='items'>
          <div className='cartItem'>
            <img width={70} height={70} src='img/rose/red rose.jpg' alt='Rose red' />
            <div>
              <p>Роза “КРАСНАЯ” цветок срезанный (1шт.)</p>
              <b>1,99 руб.</b>
            </div>

            <img className='imgCross' src='img/cross-off.png' alt='Cross off' />
          </div>

          <div className='cartItem'>
            <img width={70} height={70} src='img/rose/red rose.jpg' alt='Rose red' />
            <div>
              <p>Роза “КРАСНАЯ” цветок срезанный (1шт.)</p>
              <b>1,99 руб.</b>
            </div>

            <img className='imgCross' src='img/cross-off.png' alt='Cross off' />
          </div>
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
