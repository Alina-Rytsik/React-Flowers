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
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.warn("Токен отсутствует, вход не выполнен");
            return;
        }

        const endpoints = {
            orders: 'http://127.0.0.1:8000/api/orders/',
            favorites: 'http://127.0.0.1:8000/api/favorites/',
        };
        const url = endpoints[activeTab];
        if (!url) return;

        try {
            const res = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const resultData = Array.isArray(res.data) ? res.data : (res.data.results || []);
            setData(resultData);
        } catch (err) { 
            console.error(`Ошибка при загрузке ${activeTab}:`, err);
            if (err.response?.status === 401) {
                alert("Сессия истекла. Пожалуйста, войдите снова.");
            }
        }
    };

    //Удаление из избранного
    const handleRemoveFavorite = async (id) => {
        const token = localStorage.getItem('access_token');
        try {
            await axios.post(`http://127.0.0.1:8000/api/favorites/${id}/toggle/`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

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
                customer_name: "Пользователь",
                customer_phone: "89990000000", 
                total_price: product.price,
                 items: [
                    { product: product.id, quantity: 1 }
                ]
            };

            await axios.post('http://127.0.0.1:8000/api/orders/', orderData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(`Заказ на букет "${product.title}" успешно оформлен!`);
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
            {orders.map((order) => (
            <div key={order.id} className="order-card">
                
                <div className="order-image-box">
                    {order.items && order.items[0] && (
                        <img 
                            src={order.items[0].product_image} 
                            alt={order.items[0].product_name} 
                            style={{ width: '100%', height: 'auto', borderRadius: '10px' }} 
                        />
                    )}
                </div>

                <div className="order-main-info">
                    <div className="_info-1"> ЗАКАЗ № {order.id} </div>
                    <div className="_info-2">
                        {order.items && order.items[0] ? order.items[0].product_name : 'Букет'}
                        {order.items?.length > 1 ? ` и еще ${order.items.length - 1} шт.` : ''}
                    </div>
                </div>

                <div className="order-details">
                    <div className="_details-1"> {order.total_price} руб. </div>
                    <div className="_details-2">
                        {new Date(order.created_at).toLocaleDateString()}
                    </div>
                </div>

                <button className="repeat-btn">Повторить заказ</button>
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