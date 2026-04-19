import React from 'react';

function Cart({ cart, onRemoveFromCart, onUpdateQuantity, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.replace('$', '')) * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart ({cart.length})</h2>
      {cart.length === 0 ? (
        <p>Your cart is currently empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>{item.price} × {item.quantity} = ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</p>
                <div className="quantity-control">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <button className="remove-btn" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button className="checkout-btn" onClick={onCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
}

export default Cart;
