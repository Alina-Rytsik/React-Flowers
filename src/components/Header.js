function Header(props) {
  return (
    <header>
      <div className='headerLeft'>
        <img width={40} height={40} src='img/logo-flowers.png' alt='logo-flowers' />
        <div className='headerInfo'>
          <h3>LF</h3>
        </div>
      </div>

      <ul className='headerRight'>
        <li onClick={props.onClickCart}>
          <img className='basket' width={30} height={30} src='img/cart.png' alt='basket' />
          <span>1205 руб.</span>
        </li>

        <li>
          <img width={30} height={30} src='img/user.png' alt='entry' />
        </li>
      </ul>
    </header>
  );
}

export default Header;
