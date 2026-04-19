import React from 'react';

function Navbar({
  cartCount,
  onLoginClick,
  isLoggedIn,
  onCartClick,
  onOrdersClick,
  lang,
  setLang,
  searchTerm,
  onSearchChange,
  onSearchSubmit,
  translations,
}) {
  return (
    <nav className="header-bar">
      <div className="header-top">
        <div className="header-brand">
          <div className="brand-logo">
            <span className="logo-badge">M</span>
            <div>
              <h1>Market Store</h1>
              <p>{translations.heroSubtitle}</p>
            </div>
          </div>

          <button className="location-pill" onClick={onCartClick}>
            <span>📍</span>
            <div>
              <span className="location-label">{translations.deliveringTo}</span>
              <strong>Cairo, Egypt</strong>
            </div>
          </button>
        </div>

        <div className="header-actions">
          <button
            className={`header-action ${lang === 'en' ? 'active-lang' : ''}`}
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <button
            className={`header-action ${lang === 'ar' ? 'active-lang' : ''}`}
            onClick={() => setLang('ar')}
          >
            AR
          </button>
          <button className="header-action" onClick={onLoginClick}>
            {isLoggedIn ? translations.logout || 'Logout' : translations.login || 'Login'}
          </button>
          <button className="header-action" onClick={onOrdersClick}>
            {translations.orders}
          </button>
          <button className="header-action cart-pill" onClick={onCartClick}>
            <span>{translations.cart}</span>
            <strong>{cartCount}</strong>
          </button>
        </div>
      </div>

      <div className="header-search-row">
        <div className="search-category">
          <span>{translations.all || 'All'}</span>
        </div>

        <div className="header-search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
            placeholder={translations.searchPlaceholder}
          />
          <button className="search-btn" onClick={onSearchSubmit}>
            {translations.searchButton}
          </button>
        </div>

        <div className="promo-pill">{translations.freeDelivery}</div>
      </div>
    </nav>
  );
}

export default Navbar;
