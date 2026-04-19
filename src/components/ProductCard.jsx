import React from 'react';

function ProductCard({ product, onAddToCart, onViewDetails }) {
  const discount = product.originalPrice ?
    Math.round(((parseFloat(product.originalPrice.replace('$', '')) - parseFloat(product.price.replace('$', ''))) /
    parseFloat(product.originalPrice.replace('$', ''))) * 100) : 0;

  return (
    <div className="product-card">
      <div className="product-card-media" onClick={() => onViewDetails && onViewDetails(product.id)}>
        <img src={product.image} alt={product.name} />
        {product.offer && (
          <span className="offer-pill">{product.offer}</span>
        )}
        {discount > 0 && (
          <div className="discount-badge">-{discount}%</div>
        )}
      </div>

      <div className="product-card-content">
        <div className="product-meta">
          <span className="product-category">{product.category}</span>
          <span className={`stock-badge ${product.inStock ? 'in-stock' : 'out-stock'}`}>
            {product.inStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>

        <h3>{product.name}</h3>

        <p className="product-description">{product.description}</p>

        <div className="product-rating">
          <div className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="product-price">
          <span className="current-price">{product.price}</span>
          {product.originalPrice && (
            <span className="original-price">{product.originalPrice}</span>
          )}
        </div>

        <div className="product-extra">
          <span>{product.vendor}</span>
          <span>{product.delivery}</span>
        </div>

        <div className="product-actions">
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="add-to-cart-btn"
          >
            {product.inStock ? 'Add to Cart' : 'Out of stock'}
          </button>
          <button
            onClick={() => onViewDetails && onViewDetails(product.id)}
            className="view-details-btn"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
