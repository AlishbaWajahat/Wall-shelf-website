import { useNavigate } from 'react-router-dom'
import '../App.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      {/* Hero Section - Small and Calling */}
      <section className="hero-section-mobile">
        <div className="hero-content-mobile">
          <h1 className="hero-title-mobile">Premium Wall Shelf</h1>
          <p className="hero-subtitle-mobile">Transform your space with elegance</p>
        </div>
      </section>

      {/* Single Product Preview */}
      <section className="product-preview">
        <div className="product-preview-card" onClick={() => navigate('/product/wall-shelf')}>
          <div className="product-preview-image">
            <img src="/image 1.png" alt="Premium Wall Shelf" />
            <div className="view-details-badge">View Details</div>
          </div>
          <div className="product-preview-info">
            <h2>Premium Wall Shelf</h2>
            <p className="product-preview-price">$30.00</p>
            <p className="product-preview-desc">Elegant design, premium materials</p>
            <button className="view-product-btn">
              See Details →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
