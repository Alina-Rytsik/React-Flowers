function Drawer({ onClose, onRemove, items = [] }) {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0); // Вычисляем сумму всех цен

  return (
    <div className='overlay'>
      <div className='drawer'>
        <h2>
          Корзина <img onClick={onClose} src='/img/closeCard.png' alt='Close' />
        </h2>

        {items.length > 0 ? (
          <div className='allItems'>
            <div className='items'>
              {items.map((obj) => (
                <div key={obj.id} className='cartItem'>
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

                  <img
                    className='imgCross'
                    src='img/cross-off.png'
                    alt='Remove'
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>

            <div className='cartTotalBlock'>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice.toFixed(2)} руб.</b>{' '}
                </li>
              </ul>

              <button className='greenBtn'>
                Оформить заказ <img src='/img/right-arrow.png' alt='Right arrow' />{' '}
              </button>
            </div>
          </div>
        ) : (
          <div className='cartEmpty'>
            <img src='/img/cart empty.png' alt='Cart empty' />
            <h2>Корзина пуста</h2>
            <p>Добавьте хотя бы один букет, что бы сделать заказ.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
