import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../api';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/LoginPage.module.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login: loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      loginUser(response.data.user, response.data.token);
      console.log('Login successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Invalid email or password');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await signup(name, email, password);
      loginUser(response.data.user, response.data.token);
      console.log('Signup successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred during signup');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any existing error messages
    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-container']}>
        <h1>{isLogin ? 'Login' : 'Signup'}</h1>
        {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles['input-field']}
              />
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles['input-field']}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles['input-field']}
            />
          </div>
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        </form>
        <p className={styles['toggle-link']} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
