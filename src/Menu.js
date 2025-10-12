import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className='menuBlock'>
      <Link to='/catalog'>
        <h2>каталог</h2>
      </Link>

      <h2>о нас</h2>
      <Link to='/'>
        <h3>Lilu Flowers</h3>
      </Link>

      <h2>доставка</h2>
      <h2>отзывы</h2>
    </div>
  );
}

export default Menu;
