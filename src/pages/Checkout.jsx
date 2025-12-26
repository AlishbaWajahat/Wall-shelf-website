import { useNavigate } from 'react-router-dom'
import '../App.css'

function Checkout({ cart, removeFromCart, getTotalPrice, handleCheckout }) {
  const navigate = useNavigate()

  return (
    <section className="checkout-section">
      <div className="checkout-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button
              className="shop-now-btn"
              onClick={() => navigate('/products')}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <>
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
              <button
                className="checkout-btn pulse"
                onClick={handleCheckout}
              >
                <span>Proceed to Checkout</span>
                <span className="arrow">→</span>
              </button>
              <p className="checkout-note">
                Secure payment via Whop
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Checkout
