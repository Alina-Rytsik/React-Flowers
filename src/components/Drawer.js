import React from 'react';

function Drawer({ onClose, onRemove, items = [] }) {
  // Считаем общую сумму. Используем Number() на случай, если цена пришла строкой.
  const totalPrice = items.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className='overlay'>
      <div className='drawer'>
        <h2>
          Корзина{' '}
          <img onClick={onClose} src='/img/closeCard.png' alt='Close' className='imgCross' />
        </h2>

        {items.length > 0 ? (
          <div className='allItems d-flex flex-column flex-1'>
            <div className='items flex-1'>
              {items.map((obj) => (
                <div key={obj.id} className='cartItem d-flex align-center mb-20'>
                  <div
                    className='img'
                    style={{
                      backgroundImage: `url(${obj.imageUrl})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  ></div>

                  <div className='mr-20 flex-1'>
                    <p className='mb-5'>{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>

                  <img
                    className='imgCross'
                    src='/img/cross-off.png'
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
                  <b>{totalPrice.toFixed(2)} руб.</b>
                </li>
              </ul>

              <button className='greenBtn'>
                Оформить заказ <img src='/img/right-arrow.png' alt='Arrow' />
              </button>
            </div>
          </div>
        ) : (
          <div className='cartEmpty d-flex align-center justify-center flex-column flex-1'>
            <img className='Empty-img' width={120} src='../img/cart empty.png' alt='Empty' />
            <h2>Корзина пуста</h2>
            <p className='opacity-6'>Добавьте хотя бы один букет, чтобы сделать заказ.</p>
            <button onClick={onClose} className='greenBtn'>
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Drawer;
