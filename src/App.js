import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer/Footer.js';
import Menu from './Menu.js';
import Catalog from './pages/Catalog'; // Добавлено
import Home from './pages/Home'; // Добавлено
import Drawer from './components/Drawer'; // Добавлено

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
    axios.get('https://68d45560214be68f8c690986.mockapi.io/items').then((res) => {
      setItems(res.data);
    });
    axios.get('https://68d45560214be68f8c690986.mockapi.io/cart').then((res) => {
      setCartItems(res.data);
    });
  }, []);

  const onAddToCart = (obj) => {
    console.log(obj);
    const existingItem = cartItems.find((item) => Number(item.itemId) === Number(obj.id)); // Ищем по itemId
    if (existingItem) {
      // Если товар уже в корзине, удаляем его
      onRemoveItem(existingItem.id); // ID из корзины
    } else {
      // Иначе добавляем с itemId
      axios
        .post('https://68d45560214be68f8c690986.mockapi.io/cart', { ...obj, itemId: obj.id })
        .then((res) => {
          setCartItems((prev) => [...prev, res.data]);
        })
        .catch((error) => console.error('Ошибка добавления:', error));
    }
  };

  const onRemoveItem = (id) => {
    axios
      .delete(`https://68d45560214be68f8c690986.mockapi.io/cart/${id}`)
      .then(() => {
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id))); // Строгое сравнение с числами
      })
      .catch((error) => {
        console.error('Ошибка удаления:', error);
        // Если 404, товар уже удалён — просто обновляем локальный массив
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      });
  };

  const onChangeSearchInput = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setIsDropdownOpen(true);
  };

  const onSelectSuggestion = (title) => {
    setSearchValue(title);
    setIsDropdownOpen(false);
  };

  const onBlurInput = () => {
    setTimeout(() => setIsDropdownOpen(false), 150);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const suggestions = [...new Set(items.map((item) => item.title))]
    .filter((title) => title.toLowerCase().includes(searchValue.toLowerCase()))
    .slice(0, 5);

  return (
    <>
      {' '}
      {/* Добавлено: обёртка Router */}
      <div className='wrapper'>
        {cartOpened && (
          <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
        )}
        <Header onClickCart={() => setCartOpened(true)} />
        <Menu />
        <Routes>
          {' '}
          {/* Перемещено: теперь содержит только Route */}
          <Route
            path='/'
            exact
            element={
              <Home
                items={items}
                filteredItems={filteredItems}
                searchValue={searchValue}
                isDropdownOpen={isDropdownOpen}
                suggestions={suggestions}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSuggestion={onSelectSuggestion}
                onBlurInput={onBlurInput}
                onAddToCart={onAddToCart}
              />
            }
          />
          <Route
            path='/catalog'
            element={
              <Catalog
                items={items}
                filteredItems={filteredItems}
                searchValue={searchValue}
                isDropdownOpen={isDropdownOpen}
                suggestions={suggestions}
                onChangeSearchInput={onChangeSearchInput}
                onSelectSuggestion={onSelectSuggestion}
                onBlurInput={onBlurInput}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                setIsDropdownOpen={setIsDropdownOpen}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
