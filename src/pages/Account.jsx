import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './account.scss';


function Account() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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
      } catch (error) {
        console.error('Failed to fetch user', error);
        setError("Не удалось загрузить данные профиля");
      }
    };

    fetchUser();
  }, []);


  if (error) {
  return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
}

  if (!user) {
    return <div>Loading...</div>;
  }


  return (
    
      <div className='Menu-AboutUs'>
          <img src='/img/home/rose.png' alt='Roses'/>
          <div className='Block-AboutUs'>
            <h3>Личный кабинет</h3>
            <div className='lineUs'></div>
            <div>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          </div>
        </div>
    
    
  );
}

export default Account;