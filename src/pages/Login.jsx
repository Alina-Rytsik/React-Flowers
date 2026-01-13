import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/account');
    } catch (error) {
      console.error('There was an error logging in!', error);
    }
  };

  return (
    <div className="login">
      <img src="/img/lavender.png" alt="lavender" />

      <div className='box'>
        
        <h1>Вход</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Логин"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
          />
          <button type="submit">Войти</button>
        </form>
        
          <Link to="/register">Зарегистироваться</Link>
          <Link to="#">Забыли пароль?</Link>    
      </div>
   </div>
 );
}

export default Login;