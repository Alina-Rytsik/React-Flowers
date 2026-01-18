import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './finance.scss'; 

const Finance = () => {
  const [cards, setCards] = useState([]);
  const [isMethodsModalOpen, setIsMethodsModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  
  // Поля новой карты
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvv: '' });

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/cards/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCards(res.data);
    } catch (err) { console.error(err); }
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    // Имитация валидации и определения типа карты
    const last4 = newCard.number.slice(-4);
    const brand = newCard.number.startsWith('4') ? 'Visa' : 'Mastercard';

    try {
      await axios.post('http://127.0.0.1:8000/api/cards/', {
        brand, last4
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      fetchCards();
      setIsAddCardModalOpen(false);
      setNewCard({ number: '', expiry: '', cvv: '' });
    } catch (err) { alert('Ошибка при привязке карты'); }
  };

  const deleteCard = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cards/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCards();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="finance-section">
      <h3>Финансы</h3>
      
      <div className="finance-btn" onClick={() => setIsMethodsModalOpen(true)}>
        <img src="/img/icons/credit-card.png" alt="credit-card" />
        <span>Способы оплаты</span>
      </div>

      <div className="finance-btn">
        <img src="/img/icons/doc-file.png" alt="document file" />
        <span>Реквизиты</span>
      </div>

      {/* Модалка: Список карт */}
      {isMethodsModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Способы оплаты</h2>
              <button className="close-btn" onClick={() => setIsMethodsModalOpen(false)}>✕</button>
            </div>

            <div className="cards-list">
              {cards.map(card => (
                <div key={card.id} className={`card-item ${card.is_primary ? 'primary' : ''}`}>
                  <div className="card-info">
                    <span className="brand">{card.brand}</span>
                    <span className="number">{card.brand} •• {card.last4}</span>
                    {card.is_primary && <span className="status">Основной</span>}
                  </div>
                  <button className="remove-card" onClick={() => deleteCard(card.id)}>✕</button>
                </div>
              ))}

              <div className="add-card-trigger" onClick={() => setIsAddCardModalOpen(true)}>
                <span className="plus-icon">+</span>
                <span>Привязать карту</span>
                <span className="arrow">›</span>
              </div>
            </div>

            <button className="save-btn" onClick={() => setIsMethodsModalOpen(false)}>Сохранить</button>
          </div>
        </div>
      )}

      {/* Модалка: Ввод данных карты */}
      {isAddCardModalOpen && (
        <div className="modal-overlay z-top">
          <div className="modal-content">
            <div className="modal-header">
              <button className="back-btn" onClick={() => setIsAddCardModalOpen(false)}>←</button>
              <h2>Привязка карты</h2>
              <button className="close-btn" onClick={() => setIsAddCardModalOpen(false)}>✕</button>
            </div>
            
            <form onSubmit={handleAddCard} className="add-card-form">
              <div className="card-brands-icons">
                 <img src="/img/visa.png" alt="Visa" />
                 <img src="/img/mastercard.png" alt="MC" />
              </div>

              <input 
                type="text" placeholder="Номер карты" maxLength="16" required
                value={newCard.number}
                onChange={e => setNewCard({...newCard, number: e.target.value})}
              />
              <div className="input-row">
                <input 
                  type="text" placeholder="ММ/ГГ" maxLength="5" required
                  value={newCard.expiry}
                  onChange={e => setNewCard({...newCard, expiry: e.target.value})}
                />
                <input 
                  type="password" placeholder="CVV/CVC" maxLength="3" required
                  value={newCard.cvv}
                  onChange={e => setNewCard({...newCard, cvv: e.target.value})}
                />
              </div>

              <button type="submit" className="submit-btn">Привязать</button>
              <p className="secure-info">🛡 Данные карты надёжно защищены</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finance;