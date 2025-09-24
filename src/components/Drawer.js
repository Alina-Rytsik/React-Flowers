function Drawer(props) {
  return (
    <div className='overlay'>
      <div className='drawer'>
        <h2>
          Корзина <img onClick={props.onClose} src='/img/closeCard.png' alt='Close' />
        </h2>

        <div className='items'>
          <div className='cartItem'>
            <img width={80} height={80} src='/img/catalog/muse.png' alt='Muse' />
            <div>
              <p>Букет "МУЗА</p>
              <b>156,5 руб.</b>
            </div>

            <img className='imgCross' src='img/cross-off.png' alt='Cross off' />
          </div>

          <div className='cartItem'>
            <img width={80} height={80} src='/img/catalog/muse.png' alt='Muse' />
            <div>
              <p>Букет "МУЗА</p>
              <b>156,5 руб.</b>
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
