import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Products({ addToCart }) {
  const navigate = useNavigate()

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

  return (
    <section className="products-section">
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
  )
}

export default Products
