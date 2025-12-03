import React from 'react';
import Call from '../components/Call/index.js';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='MenuContent'>
        <img className='fonImg' src='/img/home/home-LiluFlowers.png' alt='Lilu Flowers'/>
        <Link  to='/catalog' className='pageLink'>
            <h3>КАТАЛОГ</h3>
          </Link>
        <div className='Menu-catalog'>
          <img src='/img/catalog/rosarium.png' alt='Букет "РОЗАРИУМ'/>
          <img src='/img/catalog/dreaming.png' alt='Букет "СНОВИДЕНИЕ'/>
          <img src='/img/catalog/tea-party.png' alt='Букет "ЧАЕПИТИЕ'/>
        </div>
        <Call />
        <div className='Menu-AboutUs'>
          <img src='/img/home/rose.png' alt='Roses'/>
          <div className='Block-AboutUs'>
            <h3>О НАС</h3>
            <div className='lineUs'></div>
            <div>
              <p>Мы составляем чудесные букеты и цветочные композиции и доставляем их в любую точку Гомеля — в день заказа или к нужному времени.</p>
              <p>LILU FLOWERS про честность, лояльность, скорость и эмоции, которые вы получите от наших букетов, сделанных на заказ с теплом</p>
              <p>Передавайте свои чувства через цветы с простым и удобным способом заказа в LILU FLOWERS</p>
            </div>
          </div>
        </div>

        <div className='infoAboutUs'>
          <div className='info-block'>
            <div className='info'>
              <img src="/img/icons/guarantee.png" alt="гарантия" />
              <p>гарантия свежести</p>
            </div>

            <div className='info'>
              <img src="/img/icons/delivery.png" alt="доставка" />
              <p>доставка по городу и за его пределы</p>
            </div>

            <div className='info'>
              <img src="/img/icons/present.png" alt="подарок" />
              <p>открытка в подарок</p>
            </div>
          </div>
          
          <div className='info-block'>
            <div className='info'>
              <img src="/img/icons/after00.png" alt="после 00:00" />
              <p>доставка после 00:00</p>
            </div>

            <div className='info'>
              <img src="/img/icons/Your Icon.png" alt="фото и видео" />
              <p>фото и видео перед отправкой</p>
            </div>
          </div>
        </div>

        <div className='Menu-Delivery'>
          <h3>ДОСТАВКА</h3>
          <div className='line'></div>
          <div className='infoDelivery'>
            <div>
              <img src='/img/home/flowers-delivery.png'  alt='flowers delivery'/>
            </div>
            <div>
              <ul>
                <li>Доставка осуществляется с 10:00 до 19:00 и с 19:00 до 01:00 (по предзаказу)</li>
                <li>Цена доставки устанавливается в зависимости от расстояния. Вы можете проверить свой адрес и узнать стоимость доставка при оформлении заказа.</li>
                <li>Ближайшее время доставки зависит от сложности букета.</li>
                <li>Ожидание получателя букета курьером до 15 минут, более 15 минут оплачивается отдельно. Также возможно опоздание курьера на 15 минут.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='Menu-Reviews'>
          <h3>ОТЗЫВЫ</h3>
          <div className='line'></div>
          <div>
            <img className='min' src='/img/home/review-Olga.png' alt='Отзыв Ольги' />
            <img className='max' src='/img/home/review-Alice.png' alt='Отзыв Алисы' />
            <img className='min'src='/img/home/review-Sasha.png' alt='Отзыв Саши' />
          </div>
          
        </div>
    </div>
  );
}

export default Home;
