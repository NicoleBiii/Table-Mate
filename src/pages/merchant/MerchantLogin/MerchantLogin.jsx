import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from "../../../context/AuthContext";
import './MerchantLogin.scss';

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await login(credentials.username, credentials.password);
      const from = location.state?.from?.pathname || '/merchant';
      navigate(from, { replace: true });
    } catch (err) {
      setError(t('login_page.error'));
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h1>{t('login_page.title')}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('login_page.username')}</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>{t('login_page.password')}</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? 'Processing...' : t('login_page.submit')}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;