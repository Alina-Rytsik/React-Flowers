import { Link } from 'react-router-dom';
import React from 'react';

function Header(props) {
  const isAuth = !!localStorage.getItem('access_token');

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
          <span>1205 руб.</span>
        </li>

        {isAuth ? (
          <>
            <li>
              <Link to='/account'>
                <img width={30} height={30} src='img/user.png' alt='Пользователь' />
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
