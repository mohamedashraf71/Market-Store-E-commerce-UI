import React, { useState, useEffect } from 'react';

function Login({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('login-modal-open');
    } else {
      document.body.classList.remove('login-modal-open');
    }

    return () => {
      document.body.classList.remove('login-modal-open');
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError('');

    const emailValue = email.trim();
    const passwordValue = password.trim();
    let valid = true;

    if (!emailValue) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
      setEmailError('Please enter a valid email');
      valid = false;
    }

    if (!passwordValue) {
      setEmailError('Password is required');
      valid = false;
    }

    if (isRegisterMode) {
      const confirmPasswordValue = confirmPassword.trim();
      if (!confirmPasswordValue) {
        setEmailError('Please confirm your password');
        valid = false;
      } else if (confirmPasswordValue !== passwordValue) {
        setEmailError('Passwords do not match');
        valid = false;
      }
    }

    if (!valid) {
      // Shake animation
      const form = document.querySelector('.login-form');
      if (form) {
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 300);
      }
      return;
    }

    if (passwordValue.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    const savedUsers = JSON.parse(localStorage.getItem('users') || '{}');

    if (isRegisterMode) {
      if (savedUsers[emailValue]) {
        setEmailError('Email already exists');
        return;
      }
      savedUsers[emailValue] = passwordValue;
      localStorage.setItem('users', JSON.stringify(savedUsers));
      localStorage.setItem('user', JSON.stringify({ email: emailValue, provider: 'email' }));
      alert('Account created successfully ✅');
      onLoginSuccess();
    } else {
      if (savedUsers[emailValue] && savedUsers[emailValue] === passwordValue) {
        alert('Login successful ✅');
        localStorage.setItem('user', JSON.stringify({ email: emailValue, provider: 'email' }));
        onLoginSuccess();
      } else {
        setEmailError('Invalid email or password');
      }
    }
  };

  const handleSocialLogin = (provider) => {
    const socialEmail = `${provider.toLowerCase()}user@example.com`;
    localStorage.setItem('user', JSON.stringify({ email: socialEmail, provider }));
    alert(`Signed in with ${provider}`);
    onLoginSuccess();
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setEmailError('');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="page-shell">
          <button
            className="dark-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <div className="login-wrapper">
            <div className="login-card">
              <div className="brand-bar">
                <span className="brand-dot"></span>
                <span className="brand-dot"></span>
                <span className="brand-dot"></span>
                <h1>{isRegisterMode ? 'Join Us' : 'Welcome Back'}</h1>
              </div>

              <div className="welcome-header">
                <h2>Welcome to Market Store</h2>
                <p>{isRegisterMode ? 'Create your account to get started' : 'Sign in to your account'}</p>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                <h2>{isRegisterMode ? 'Create account' : 'Sign in'}</h2>

                <div className="input-group">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder=" "
                  />
                  <label htmlFor="email">Email</label>
                  <small className="error" id="emailError">{emailError}</small>
                </div>

                <div className="input-group password-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
                    placeholder=" "
                  />
                  <label htmlFor="password">Password</label>
                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </span>
                </div>

                {isRegisterMode && (
                  <div className="input-group password-group">
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      placeholder=" "
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                  </div>
                )}

                <button type="submit" className="primary-btn">
                  {isRegisterMode ? 'Register' : 'Login'}
                </button>

                <p className="form-note">
                  {isRegisterMode ? "Already have an account? " : "Don't have an account? "}
                  <button type="button" className="switch-link" onClick={toggleMode}>
                    {isRegisterMode ? 'Sign in' : 'Register'}
                  </button>
                </p>
              </form>

              <div className="divider">
                <span>or continue with</span>
              </div>

              <div className="social-login">
                <button
                  type="button"
                  className="social-btn google"
                  onClick={() => handleSocialLogin('Google')}
                >
                  Login with Google
                </button>
                <button
                  type="button"
                  className="social-btn facebook"
                  onClick={() => handleSocialLogin('Facebook')}
                >
                  Login with Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;