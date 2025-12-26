import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Checkout from './pages/Checkout'
import './App.css'

function ParticleEffects() {
  useEffect(() => {
    const homeSection = document.querySelector('.home-section')
    if (!homeSection) return

    const createParticle = () => {
      const particle = document.createElement('div')
      const types = ['particle', 'particle-star', 'particle-circle', 'particle-square']
      particle.className = types[Math.floor(Math.random() * types.length)]
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDuration = (Math.random() * 4 + 3) + 's'
      particle.style.opacity = Math.random() * 0.6 + 0.2
      const size = Math.random() * 6 + 2
      particle.style.width = size + 'px'
      particle.style.height = size + 'px'
      homeSection.appendChild(particle)

      setTimeout(() => particle.remove(), 7000)
    }

    const interval = setInterval(createParticle, 200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const homeSection = document.querySelector('.home-section')
    if (!homeSection) return

    const createShape = () => {
      const shape = document.createElement('div')
      shape.className = 'floating-shape'
      shape.style.left = Math.random() * 100 + '%'
      shape.style.top = Math.random() * 100 + '%'
      shape.style.animationDuration = (Math.random() * 10 + 15) + 's'
      shape.style.animationDelay = (Math.random() * 5) + 's'
      const size = Math.random() * 100 + 50
      shape.style.width = size + 'px'
      shape.style.height = size + 'px'
      homeSection.appendChild(shape)
    }

    for (let i = 0; i < 8; i++) {
      createShape()
    }
  }, [])

  return null
}

function Navigation({ cart, setShowCart }) {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo-link">
          <h1 className="logo">ShelfCo</h1>
        </Link>
        <ul className="nav-menu">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === '/products' ? 'active' : ''}>
            <Link to="/products">Products</Link>
          </li>
          {cart.length > 0 && (
            <li className={`cart-nav-item ${location.pathname === '/checkout' ? 'active' : ''}`}>
              <Link to="/checkout">Cart ({cart.length})</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (product) => {
    setCart([...cart, product])
    const cartBtn = document.querySelector('.floating-cart')
    if (cartBtn) {
      cartBtn.classList.add('cart-bounce')
      setTimeout(() => cartBtn.classList.remove('cart-bounce'), 600)
    }
  }

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index)
    setCart(newCart)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2)
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }
    window.open('https://whop.com/checkout/plan_gVw94z5MgcXLI', '_blank')
  }

  return (
    <Router>
      <div className="app">
        <Navigation cart={cart} setShowCart={setShowCart} />

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <Link to="/checkout" className="floating-cart">
            <span className="cart-icon">🛒</span>
            <span className="cart-badge">{cart.length}</span>
          </Link>
        )}

        <ParticleEffects />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                removeFromCart={removeFromCart}
                getTotalPrice={getTotalPrice}
                handleCheckout={handleCheckout}
              />
            }
          />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; 2024 ShelfCo. All rights reserved.</p>
        </footer>

        {/* Cart Modal (kept for backward compatibility) */}
        {showCart && cart.length > 0 && (
          <div className="cart-modal" onClick={() => setShowCart(false)}>
            <div className="cart-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-cart" onClick={() => setShowCart(false)}>✕</button>
              <h2>Your Cart</h2>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>${item.price}</p>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <div className="total">
                  <span>Total:</span>
                  <span className="total-price">${getTotalPrice()}</span>
                </div>
                <Link to="/checkout" onClick={() => setShowCart(false)}>
                  <button className="checkout-btn pulse">
                    <span>Go to Checkout</span>
                    <span className="arrow">→</span>
                  </button>
                </Link>
                <p className="checkout-note">
                  Secure payment via Whop
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
