import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './account.scss';

function Account() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'male'
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('access_token'); 
        if (!token) {
          setError("Вы не авторизованы");
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        setUser(response.data);
        // Преобразуем данные с сервера в наш формат
        setUserData({
          firstName: response.data.first_name || response.data.username || '',
          lastName: response.data.last_name || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          gender: response.data.gender || 'male'
        });
      } catch (error) {
        console.error('Failed to fetch user', error);
        setError("Не удалось загрузить данные профиля");
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        alert('Сессия истекла. Войдите заново.');
        window.location.href = '/login';
        return;
      }

      // Преобразуем данные обратно в snake_case перед отправкой на сервер
      const dataToSend = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender
      };

      await axios.patch('http://127.0.0.1:8000/api/profile/', dataToSend, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      setIsEditing(false);
      alert('Данные успешно сохранены!');
      
      // Необязательно, но полезно: обновить локальный стейт user 
      // чтобы handleCancel потом работал корректно
      setUser(prev => ({...prev, ...dataToSend}));

    } catch (error) {
      console.error('Failed to save profile', error);
      if (error.response && error.response.status === 401) {
        alert('Ошибка авторизации. Попробуйте перезайти в аккаунт.');
      } else {
        alert('Ошибка при сохранении данных');
      }
    }
  };

  const handleCancel = () => {
    // Восстанавливаем исходные данные пользователя
    setUserData({
      firstName: user.first_name || user.username || '',
      lastName: user.last_name || '',
      email: user.email || '',
      phone: user.phone || '',
      gender: user.gender || 'male'
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти?')) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete('http://127.0.0.1:8000/api/profile/', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });
      localStorage.removeItem('access_token');
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to delete account', error);
      alert('Ошибка при удалении аккаунта');
    }
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Account-box'>
      <h3>Личный кабинет</h3>
      <img src='/img/home/rose.png' alt='Roses'/>

      <div className='PersonalData'>
        <div className="profile-header">
          <div className="avatar-section">
            <div className="avatar">
              {userData.firstName[0]}{userData.lastName[0]}
            </div>
          </div>

          <h3>
            {userData.firstName} {userData.lastName}
          </h3>

          {!isEditing && (
              <img className="gear-btn"src='./img/gear.png' alt='gear'onClick={() => setIsEditing(true)} />
          )}
        </div>
        
        <div className='lineAccount'></div>
        
        <div className="profile-content">

          <div className="form-section">
            <div className="form-group">
              <label>Имя:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{userData.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label >Фамилия:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{userData.lastName}</span>
              )}
            </div>

            <div className="form-group">
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{userData.email}</span>
              )}
            </div>

            <div className="form-group">
              <label>Телефон:</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <span>{userData.phone}</span>
              )}
            </div>

            <div className="form-group">
              <label>Пол:</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleInputChange}
                >
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
              ) : (
                <span>
                  {userData.gender === 'male' ? 'Мужской' : 'Женский'}
                </span>
              )}
            </div>

            {isEditing && (
              <div className="action-buttons">
                <button 
                  className="save-btn" 
                  onClick={handleSave}
                >
                  Сохранить
                </button>
                <button 
                  className="cancel-btn" 
                  onClick={handleCancel}
                >
                  Отмена
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-footer">
          <button 
            className="exit-btn" 
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
          <button 
            className="delete-btn" 
            onClick={handleDeleteAccount}
          >
            Удалить аккаунт
          </button>
        </div>

        {showDeleteConfirm && (
          <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div className="confirm-modal" style={{
              background: 'white',
              padding: '30px',
              borderRadius: '8px',
              textAlign: 'center',
              maxWidth: '400px',
              width: '90%'
            }}>
              <h3 style={{color: '#f44336', marginBottom: '15px'}}>Подтверждение удаления</h3>
              <p>Вы уверены, что хотите удалить аккаунт? Это действие нельзя отменить.</p>
              <div className="modal-buttons" style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                marginTop: '20px'
              }}>
                <button 
                  className="confirm-delete-btn" 
                  onClick={confirmDelete}
                  style={{
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Удалить аккаунт
                </button>
                <button 
                  className="cancel-delete-btn" 
                  onClick={cancelDelete}
                  style={{
                    background: '#757575',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
