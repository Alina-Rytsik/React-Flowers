import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
  {
    title: 'Букет "МУЗА"',
    price: 156.5,
    imageUrl: '/img/catalog/muse.png',
  },
  {
    title: 'Букет "СНОВИДЕНИЕ"',
    price: 272.9,
    imageUrl: '/img/catalog/dreaming.png',
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
];

function App() {
  return (
    <div className='wrapper'>
      <Drawer />
      <Header />

      <div className='content'>
        <h1>Каталог</h1>

        <div className='search-blok'>
          <img src='img/search.png' alt='Search' />
          <input placeholder='Поиск ...' />
        </div>
      </div>

      <div className='catalog'>
        {arr.map((obj) => (
          <Card
            title={obj.title}
            price={obj.price}
            imageUrl={obj.imageUrl}
            onFavorite={() => console.log('Добавили в закладки')}
            onPlus={() => console.log('Нажали плюс')}
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
