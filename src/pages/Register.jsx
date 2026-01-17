import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/register/', {
        username: username, // данные из стейтов инпутов
        email: email,
        password: password
      });
      alert('Регистрация успешна! Теперь войдите.');
      navigate('/login'); // перенаправляем на вход
    } catch (err) {
      // Проверяем, есть ли ответ от сервера с текстом ошибки
      const errorMessage = err.response?.data 
        ? JSON.stringify(err.response.data) 
        : 'Произошла ошибка при регистрации';
      alert("Ошибка регистрации: " + errorMessage);
    }
  };

  return (
    <div className='register'>
      <img src="/img/lavender.png" alt="lavender" />

      <div className='box'>
        <h1>Регистрация</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Имя пользователя"
          />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
          />
          <button type="submit">Зарегистрироваться</button>
        </form>
      <p>
        У вас уже есть аккаунт? <Link to="/login">Авторизоваться</Link>
      </p>
     </div>
   </div>
 );
}

export default Register;