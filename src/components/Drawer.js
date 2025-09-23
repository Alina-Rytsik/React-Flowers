function Drawer() {
  return (
    <div className='overlay' style={{ display: 'none' }}>
      <div className='drawer'>
        <h2>
          Корзина
          <div className='imgCartOff' aria-label='image Cart Off' role='button'>
            <svg
              width='30'
              height='30'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              focusable='false'
            >
              <path
                d='M18 6L6 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M6 6L18 18'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>
        </h2>

        <div className='items'>
          <div className='cartItem'>
            <img width={90} height={90} src='/img/catalog/muse.png' alt='Muse' />
            <div>
              <p>Букет "МУЗА</p>
              <b>156,5 руб.</b>
            </div>

            <img className='imgCross' src='img/cross-off.png' alt='Cross off' />
          </div>

          <div className='cartItem'>
            <img width={90} height={90} src='/img/catalog/muse.png' alt='Muse' />
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
