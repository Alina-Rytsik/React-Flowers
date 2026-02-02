import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileMenu.scss';

const ProfileMenu = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [data, setData] = useState([]);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        // Создаем карту соответствия вкладок и реальных URL твоего API
        const endpoints = {
            orders: 'http://127.0.0.1:8000/api/orders/',
            favorites: 'http://127.0.0.1:8000/api/favorites/',
            reviews: 'http://127.0.0.1:8000/api/reviews/',    // Если создашь такой путь позже
        };
        const url = endpoints[activeTab];
        // Если для этой вкладки нет URL (например, для 'bonuses'), очищаем данные и выходим
        if (!url) {
            setData([]);
            return;
        }
        try {
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Делаем проверку, чтобы всегда получать массив:
            const resultData = Array.isArray(res.data) ? res.data : (res.data.results || []);
            setData(resultData);
        } catch (err) { 
            console.error(`Ошибка при загрузке ${activeTab}:`, err);
            setData([]); // В случае ошибки (например, 404) обнуляем список
        }
    };

    //Удаление из избранного
    const handleRemoveFavorite = async (id) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/favorites/${id}/toggle/`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // обновляем данные
            fetchData();
        } catch (err) {
            console.error("Ошибка при удалении из избранного:", err);
        }
    };

    //Оформление заказа из избранного
    const handleCreateOrder = async (product) => {
        try {
            // Данные для создания заказа (OrderSerializer)
            const orderData = {
                customer_name: "Пользователь", // В идеале взять из данных профиля
                customer_phone: "89990000000", 
                total_price: product.price,
                products: [
                    { product: product.id, quantity: 1 }
                ]
            };

            await axios.post('http://127.0.0.1:8000/api/orders/', orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(`Заказ на букет "${product.title}" успешно оформлен!`);
            // Переключаем вкладку на "Мои заказы", чтобы пользователь увидел новый заказ
            setActiveTab('orders');
        } catch (err) {
            console.error("Ошибка при создании заказа:", err);
            alert("Ошибка! Проверьте, залогинены ли вы.");
        }
    };


    return (
        <div className="profile-container">
            <div className="tabs-header">
                <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>МОИ ЗАКАЗЫ</button>
                <button className={activeTab === 'bonuses' ? 'active' : ''} onClick={() => setActiveTab('bonuses')}>СКИДКИ И БОНУСЫ</button>
                <button className={activeTab === 'favorites' ? 'active' : ''} onClick={() => setActiveTab('favorites')}>ИЗБРАННОЕ</button>
                <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>ОТЗЫВЫ</button>
            </div>

            <div className="tab-content">
                {activeTab === 'orders' && <OrdersTab orders={data} />}
                {activeTab === 'bonuses' && <BonusesTab />}
                {activeTab === 'favorites' && (
                    <FavoritesTab 
                        products={data} 
                        onRemove={handleRemoveFavorite} 
                        onOrder={handleCreateOrder} 
                    />
                )}
                {activeTab === 'reviews' && <ReviewsTab reviews={data} />}
            </div>
        </div>
        );
};

      // Вкладка ЗАКАЗЫ
      const OrdersTab = ({ orders }) => (
          <div className="orders-list">
              {orders.map(order => (
                  <div key={order.id} className="order-card">
                      <div className="order-header">
                          <span>ЗАКАЗ № {order.id}</span>
                          <span className={`status ${order.status}`}>{order.status_display}</span>
                          <span>{order.total_price} руб.</span>
                          <button className="repeat-btn">Повторить заказ</button>
                      </div>
                      {/* Список товаров внутри заказа */}
                  </div>
              ))}
          </div>
      );

      // Вкладка БОНУСЫ
      const BonusesTab = () => (
          <div className="bonuses-grid">
              <div className="bonus-card">
                  <p>Ваша скидка</p>
                  <h2>10%</h2>
                  <div className="progress-bar"><div style={{width: '40%'}}></div></div>
              </div>
              <div className="bonus-card">
                  <p>Бонусные рубли</p>
                  <h2>350 руб.</h2>
              </div>
              <div className="bonus-card">
                  <p>Карта покупателя</p>
                  <h2>20%</h2>
              </div>
          </div>
      );

      // Вкладка ИЗБРАННОЕ
      const FavoritesTab = ({ products, onRemove, onOrder }) => (
          <div className="products-grid">
              {products.map(p => (
                  <div key={p.id} className="product-card">
                      <img onClick={() => onRemove(p.id)} 
                        src='/img/cross-off.png'
                        alt='Close' 
                        className='product-Cross' 
                      />
                      <img src={p.imageUrl} alt={p.title} />
                      <h3>{p.title}</h3>
                      <p>{p.price} руб.</p>
                      <button className="fav-btn" onClick={() => onOrder(p)}> Заказать </button>
                  </div>
              ))}
          </div>
      );

      // Вкладка ОТЗЫВЫ
      const ReviewsTab = ({ reviews }) => (
      <div className="reviews-list">
          {reviews.map(r => (
              <div key={r.id} className="review-item">
                  <h4>Букет: {r.product_name}</h4>
                  <div className="stars">{'★'.repeat(r.rating)}</div>
                  <p>{r.text}</p>
                  <small>{new Date(r.created_at).toLocaleDateString()}</small>
              </div>
          ))}
      </div>
      );

export default ProfileMenu;