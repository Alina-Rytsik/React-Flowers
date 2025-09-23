function Header() {
  return (
    <header>
      <div className='headerLeft'>
        <img width={50} height={50} src='img/logo-flowers.png' />
        <div className='headerInfo'>
          <h3>React Flowers</h3>
          <p>Лучшие цветы в городе!</p>
        </div>
      </div>

      <ul className='headerRight'>
        <li>
          <img className='basket' width={30} height={30} src='img/cart.png' />
          <span>1205 руб.</span>
        </li>

        <li>
          <img width={30} height={30} src='img/user.png' />
        </li>
      </ul>
    </header>
  );
}

export default Header;
