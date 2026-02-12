import { Link } from 'react-router-dom';
import React from 'react';

function Header(props) {
  const isAuth = !!localStorage.getItem('access_token');
  const totalPrice = (props.items || []).reduce((sum, item) => sum + Number(item.price), 0);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
  };

  return (
    <header>
      <Link to='/'>
        <div className='headerLeft'>
          <img width={40} height={40} src='img/logo-flowers.png' alt='logo-flowers' />

          <div className='headerInfo'>
            <h3>LF</h3>
          </div>
        </div>
      </Link>

      <ul className='headerRight'>
        <li onClick={props.onClickCart}>
          <img className='basket' width={30} height={30} src='img/cart.png' alt='Корзина' />
          <span>{totalPrice.toFixed(2)} руб.</span>
        </li>
        <li>
          <Link to='/login'>
            <img width={30} height={30} src='img/user.png' alt='Пользователь' />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
