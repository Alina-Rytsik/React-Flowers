import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

/*const arr = [
  {
    title: 'Букет "РОЗАРИУМ"',
    price: 110.5,
    imageUrl: '/img/catalog/rosarium.png',
  },
  {
    title: 'Букет "СНОВИДЕНИЕ"',
    price: 172.0,
    imageUrl: '/img/catalog/dreaming.png',
  },
  {
    title: 'Букет "ЧАЕПИТИЕ"',
    price: 100.7,
    imageUrl: '/img/catalog/tea-party.png',
  },
  {
    title: 'Букет "МУЗА"',
    price: 156.5,
    imageUrl: '/img/catalog/muse.png',
  },
  {
    title: 'Букет "СИМИНА"',
    price: 87.3,
    imageUrl: '/img/catalog/simone.png',
  },
  {
    title: 'Букет "УТРО"',
    price: 80.0,
    imageUrl: '/img/catalog/morning.png',
  },
  {
    title: 'Букет "ДЖОРДЖИЯ"',
    price: 80.0,
    imageUrl: '/img/catalog/georgia.png',
  },
  {
    title: 'Букет "ВОСХИЩЕНИЕ"',
    price: 116.5,
    imageUrl: '/img/catalog/admiration.png',
  },
];*/
//Данные карточек букетов на бэке items (function App => items)

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]); //корзина пуста, данные с mockapi.io
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://68d45560214be68f8c690986.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);
  //Вытягивает данные по карточкам с mockapi.io. Без повторений и нагрозки для сервиса.

  const onAddToCar = (obj) => {
    setCartItems((prev) => [...prev, obj]);
  };
  console.log(cartItems);

  return (
    <div className='wrapper'>
      {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className='content'>
        <h1>Каталог</h1>

        <div className='search-blok'>
          <img src='img/search.png' alt='Search' />
          <input placeholder='Поиск ...' />
        </div>
      </div>

      <div className='catalog'>
        {items.map((item) => (
          <Card
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            onFavorite={() => console.log('Добавили в закладки')}
            onPlus={(obj) => onAddToCar(obj)} //'Нажали плюс'
          />
        ))}
      </div>

      <div className='noСhoice'>
        <div className='line'></div>
        <h2>Не смогли выбрать?</h2>
        <p>
          Не проблема! Мы подберем букет по вашему индивидуальному запросу. <br />
          Закажите звонок и мы перезвоним вам в течение 5 минут.
        </p>
        <button className='btnCall' aria-label='Заказать звонок'>
          Заказать звонок
        </button>
      </div>
    </div>
  );
}

export default App;
