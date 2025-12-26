import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  const addToCart = (product) => {
    setCart([...cart, product])
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
        {/* Simple Header */}
        <header className="header">
          <Link to="/" className="logo">ShelfCo</Link>
          {cart.length > 0 && (
            <button className="cart-icon-header" onClick={() => setShowCart(true)}>
              🛒 <span className="cart-count">{cart.length}</span>
            </button>
          )}
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/wall-shelf" element={<ProductDetail addToCart={addToCart} />} />
        </Routes>

        {/* Simple Footer */}
        <footer className="footer-mobile">
          <p>&copy; 2024 ShelfCo. Premium Wall Shelves.</p>
        </footer>

        {/* Cart Modal */}
        {showCart && cart.length > 0 && (
          <div className="cart-modal-mobile" onClick={() => setShowCart(false)}>
            <div className="cart-modal-content-mobile" onClick={(e) => e.stopPropagation()}>
              <button className="close-cart-mobile" onClick={() => setShowCart(false)}>✕</button>
              <h2>Your Cart ({cart.length})</h2>
              <div className="cart-items-mobile">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item-mobile">
                    <img src={item.images[0]} alt={item.name} />
                    <div className="cart-item-info-mobile">
                      <h4>{item.name}</h4>
                      <p>${item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(index)}>✕</button>
                  </div>
                ))}
              </div>
              <div className="cart-total-mobile">
                <span>Total:</span>
                <span>${getTotalPrice()}</span>
              </div>
              <button className="checkout-btn-mobile" onClick={handleCheckout}>
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
