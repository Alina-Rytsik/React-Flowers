import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/register/', {
        username,
        email,
        password,
      });
      alert('User registered successfully');
    } catch (error) {
      console.error('There was an error registering the user!', error);
    }
  };

  return (
    <div className='register'>
      <img src="/img/lavender.png" alt="lavender" />

      <div className='box'>
        <h1>Регистратция</h1>
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