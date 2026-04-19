import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './src/App';

describe('E-commerce UI', () => {
  it('renders login modal on initial load', () => {
    render(<App />);
    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });

  it('shows products after login', () => {
    render(<App />);

    // Simulate login
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: ' '  } });
    fireEvent.change(passwordInput, { target: { value: ' ' } });
    fireEvent.click(loginButton);

    // Check if products are displayed
    expect(screen.getByText('Premium Wireless Headphones')).toBeInTheDocument();
  });

  it('adds product to cart', () => {
    render(<App />);

    // Login first
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(loginButton);

    // Add product to cart
    const addToCartButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addToCartButtons[0]);

    // Check cart count
    expect(screen.getByText('Cart (1)')).toBeInTheDocument();
  });
});