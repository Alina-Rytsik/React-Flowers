import React from 'react';
import { BrowserRouter as Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer/Footer.js';
import Menu from './Menu.js';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import Drawer from './components/Drawer';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Account from './pages/Account';

// Импортируем наши локальные данные
import api from './api/axios';
import productsData from './items';

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState(productsData); // Сразу загружаем товары из файла
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        // Пытаемся взять данные с бэкенда
        const res = await api.get('/api/products/');
        setItems(res.data);
      } catch (err) {
        // Если бэкенд не ответил (ошибка), берем данные из нашего файла items.js
        console.log('Бэкенд пока не отвечает, используем локальные данные');
        setItems(productsData);
      } finally {
        // В любом случае выключаем скелетон (загрузку)
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // 2. При первом запуске проверяем авторизацию и загружаем корзину из памяти браузера
  React.useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);

    // Загружаем сохраненную корзину из localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Имитация загрузки (скелетон)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 1 секунда для красоты

    return () => clearTimeout(timer);
  }, []);

  // 3. Каждый раз, когда корзина меняется, сохраняем её в localStorage
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Функция добавления/удаления
  const onAddToCart = (obj) => {
    // Проверяем, есть ли уже такой товар в корзине
    const isExist = cartItems.find((item) => Number(item.id) === Number(obj.id));

    if (isExist) {
      // Если есть - удаляем
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      // Если нет - добавляем
      setCartItems((prev) => [...prev, obj]);
    }
  };

  // Функция удаления из корзины (для крестика в корзине)
  const onRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
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
    <AppContext.Provider value={{ items, cartItems, onAddToCart, onRemoveItem }}>
      <div className='wrapper'>
        {cartOpened && (
          <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
        )}

        <Header onClickCart={() => setCartOpened(true)} />
        <Menu />

        <Routes>
          <Route
            path='/'
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
                cartItems={cartItems}
                loading={loading}
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
                loading={loading}
              />
            }
          />
          <Route
            path='/login'
            element={isAuthenticated ? <Navigate to='/account' replace /> : <Login />}
          />
          <Route
            path='/register'
            element={isAuthenticated ? <Navigate to='/account' replace /> : <Register />}
          />
          <Route
            path='/account'
            element={isAuthenticated ? <Account /> : <Navigate to='/login' replace />}
          />
        </Routes>

        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
