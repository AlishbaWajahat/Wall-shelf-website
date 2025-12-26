import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [isVisible, setIsVisible] = useState({})
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const homeRef = useRef(null)
  const productRef = useRef(null)
  const checkoutRef = useRef(null)

  const products = [
    {
      id: 1,
      name: 'Premium Wall Shelf - Classic',
      price: 89.99,
      image: '/image 1.png',
      description: 'Elegant wall shelf perfect for displaying your favorite items. Made with premium materials for lasting durability.'
    },
    {
      id: 2,
      name: 'Premium Wall Shelf - Modern',
      price: 99.99,
      image: '/image 2.png',
      description: 'Contemporary design wall shelf that adds a touch of sophistication to any room. Maximizes space while maintaining style.'
    }
  ]

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const addToCart = (product) => {
    setCart([...cart, product])
    // Add bounce animation to cart button
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

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = []
    const elements = document.querySelectorAll('.product-card, .section-header')

    elements.forEach((el, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('visible')
              }, index * 100)
            }
          })
        },
        { threshold: 0.1 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(observer => observer.disconnect())
  }, [])

  // Create enhanced particle system
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

  // Create floating geometric shapes
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

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">ShelfCo</h1>
          <ul className="nav-menu">
            <li onClick={() => scrollToSection(homeRef)}>Home</li>
            <li onClick={() => scrollToSection(productRef)}>Products</li>
            {cart.length > 0 && (
              <li onClick={() => setShowCart(!showCart)} className="cart-nav-item">
                Cart ({cart.length})
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <button className="floating-cart" onClick={() => setShowCart(!showCart)}>
          <span className="cart-icon">🛒</span>
          <span className="cart-badge">{cart.length}</span>
        </button>
      )}

      {/* Home Section */}
      <section ref={homeRef} className="home-section">
        {/* Animated Grid Background */}
        <div className="grid-background"></div>

        {/* Pulsing Orbs */}
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>

        <div className="background-animation">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>

        <div
          className="hero-content"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="title-container">
            <h1 className="hero-title animate-fade-in">
              <span className="word-animation">Premium</span>{' '}
              <span className="word-animation delay-1">Wall</span>{' '}
              <span className="word-animation delay-2">Shelves</span>
            </h1>
          </div>
          <p className="hero-subtitle animate-fade-in-delay">
            Transform your space with our elegant, handcrafted wall shelves
          </p>
          <button
            className="cta-button animate-fade-in-delay-2"
            onClick={() => scrollToSection(productRef)}
          >
            <span>Explore Collection</span>
            <span className="button-glow"></span>
          </button>
        </div>
        <div className="hero-overlay"></div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow-down"></div>
        </div>
      </section>

      {/* Products Section */}
      <section ref={productRef} className="products-section">
        <div className="section-header">
          <h2>Our Collection</h2>
          <p>Discover our premium wall shelf collection</p>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <div key={product.id} className="product-card" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="product-glow"></div>
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="image-overlay">
                  <span className="quick-view">View Details</span>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price}</span>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    <span>Add to Cart</span>
                    <span className="btn-icon">+</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Modal/Overlay */}
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
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 ShelfCo. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
