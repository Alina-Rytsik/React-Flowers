import React from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Call from './components/Call/Сall.js';
import Footer from './components/Footer/Footer.js';
import Menu from './Menu.js';

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
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false); // Новое: для показа dropdown

  React.useEffect(() => {
    /*fetch('https://68d45560214be68f8c690986.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });*/
    axios.get('https://68d45560214be68f8c690986.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://68d45560214be68f8c690986.mockapi.io/cart', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onChangeSearchInput = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setIsDropdownOpen(true); // Показываем dropdown при вводе
  };

  const onSelectSuggestion = (title) => {
    setSearchValue(title); // Устанавливаем выбранное название
    setIsDropdownOpen(false); // Скрываем dropdown
  };

  const onBlurInput = () => {
    // Скрываем dropdown при потере фокуса (с небольшой задержкой, чтобы клик по варианту сработал)
    setTimeout(() => setIsDropdownOpen(false), 150);
  };

  // Фильтруем товары по searchValue (если пусто — показываем все)
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // Получаем уникальные названия для dropdown (фильтруем по вводу)
  const suggestions = [...new Set(items.map((item) => item.title))] // Уникальные title
    .filter((title) => title.toLowerCase().includes(searchValue.toLowerCase())) // Фильтр по вводу
    .slice(0, 5); // Ограничиваем до 5 вариантов для удобства

  return (
    <div className='wrapper'>
      {cartOpened ? <Drawer items={cartItems} onClose={() => setCartOpened(false)} /> : null}
      <Header onClickCart={() => setCartOpened(true)} />

      <Menu />

      <div className='content'>
        <div className='search-blok'>
          <img src='img/search.png' alt='Search' />
          <input
            onChange={onChangeSearchInput}
            onFocus={() => setIsDropdownOpen(true)} // Показываем dropdown при фокусе
            onBlur={onBlurInput} // Скрываем при потере фокуса
            value={searchValue}
            placeholder='Поиск ...'
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className='clear'
              src='/img/closeCard.png'
              alt='Clear'
            />
          )}
          {/* Dropdown меню с подсказками */}
          {isDropdownOpen && suggestions.length > 0 && (
            <ul className='dropdown-menu'>
              {' '}
              {/* Стили добавьте ниже */}
              {suggestions.map((title, index) => (
                <li
                  key={index}
                  onMouseDown={() => onSelectSuggestion(title)} // Используем onMouseDown, чтобы сработало до onBlur
                >
                  {title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className='catalog'>
        <h2>Каталог</h2>
        <div className='lineBlock'>
          <div className='line'></div>
        </div>
        {filteredItems.map((item, index) => (
          <Card
            key={index} // Лучше использовать item.id, если есть в API
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            onFavorite={() => console.log('Добавили в закладки')}
            onPlus={(obj) => onAddToCart(obj)}
          />
        ))}
        {filteredItems.length === 0 && searchValue && (
          <p>Ничего не найдено по запросу "{searchValue}"</p>
        )}
      </div>
      <Call />
      <Footer />
    </div>
  );
}

export default App;
