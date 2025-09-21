import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  return (
    <div className='wrapper'>
      <Drawer />
      <Header />

      <div className='content'>
        <h1>Весь ассортимент</h1>

        <div className='search-blok'>
          <img src='img/search.png' alt='Search' />
          <input placeholder='Поиск ...' />
        </div>
      </div>

      <div className='rose'>
        <Card />
        <Card />
        <Card />

        <div className='card'>
          <img width={130} height={150} src='img/rose/yellow roses.jpg' alt='Rose yellow' />
          <h5>Роза “ЖЕЛТАЯ” цветок срезанный (1шт.)</h5>
          <div className='_blok'>
            <div className='__text'>
              <span>Цена: </span>
              <b>2,50 руб.</b>
            </div>

            <button className='button'>
              <img width={11} height={11} src='/img/btn-plus.png' alt='Plus' />
            </button>
          </div>
        </div>

        <div className='card'>
          <img width={130} height={150} src='img/rose/white rose.jpg' alt='Rose white' />
          <h5>Роза “БЕЛАЯ” цветок срезанный (1шт.)</h5>
          <div className='_blok'>
            <div className='__text'>
              <span>Цена: </span>
              <b>2,70 руб.</b>
            </div>

            <button className='button'>
              <img width={11} height={11} src='/img/btn-plus.png' alt='Plus' />
            </button>
          </div>
        </div>

        <div className='card'>
          <img width={130} height={150} src='img/rose/pink rose.jpg' alt='Rose pink' />
          <h5>Роза “КРАСНАЯ” цветок срезанный (1шт.)</h5>
          <div className='_blok'>
            <div className='__text'>
              <span>Цена: </span>
              <b>2,99 руб.</b>
            </div>

            <button className='button'>
              <img width={11} height={11} src='/img/btn-plus.png' alt='Plus' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
