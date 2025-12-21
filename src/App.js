import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import Footer from './components/Footer/Footer.js';
import Menu from './Menu.js';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import Drawer from './components/Drawer';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Account from './pages/Account';

const AppContext = React.createContext({});

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

// *** !!! БЭК !!! ***
// Настройка базового URL для всех запросов
axios.defaults.baseURL = 'http://localhost:8000';
// Интерцептор для автоматической добавления токена в заголовки запросов
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// Интерцептор для обработки ошибки 401 (Неавторизован)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Если токен просрочен или недействителен, удаляем его и перенаправляем на страницу входа
      console.log('Ошибка 401: Токен недействителен. Выполняется выход...');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login'; // Принудительный перезапуск приложения для сброса состояния
    }
    return Promise.reject(error);
  },
);

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]); //корзина пуста, данные с mockapi.io
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false); // Новое: для показа dropdown
  const [loading, setLoading] = React.useState(true);

  // Новое состояние: проверка, авторизован ли пользователь
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  // Эффект для проверки наличия токена при загрузке приложения
  React.useEffect(() => {
    const token = localStorage.getItem('access_token');
    // Простая проверка: если токен есть, считаем пользователя авторизованным.
    // На практике нужно проверять его валидность на бэкенде.
    setIsAuthenticated(!!token);
  }, []); // Запускается только при первом рендере

  React.useEffect(() => {
    // Запрос к вашему Django API
    axios
      .get('http://localhost:8000/api/items/')
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error('Ошибка загрузки товаров:', error);
      });

    // Запрос к mock API (оставляем как было)
    axios
      .get('https://68d45560214be68f8c690986.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((error) => {
        console.error('Ошибка загрузки корзины:', error);
      });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // = 5 сек.
    return () => clearTimeout(timer); // Очистка таймера
  }, []);

  const onAddToCart = (obj) => {
    console.log(obj);
    const existingItem = cartItems.find((item) => Number(item.itemId) === Number(obj.id)); //
    if (existingItem) {
      // Если товар уже в корзине, удаляем его
      onRemoveItem(existingItem.id);
    } else {
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
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id))); //обновляем локальный массив
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
    <AppContext.Provider value={{ items, cartItems }}>
      <>
        <div className='wrapper'>
          {cartOpened && (
            <Drawer
              items={cartItems}
              onClose={() => setCartOpened(false)}
              onRemove={onRemoveItem}
            />
          )}
          <Header onClickCart={() => setCartOpened(true)} />
          <Menu />
          <Routes>
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
      </>
    </AppContext.Provider>
  );
}

export default App;
