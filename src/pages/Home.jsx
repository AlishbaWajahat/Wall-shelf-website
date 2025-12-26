import { useNavigate } from 'react-router-dom'
import '../App.css'

function Home() {
  const navigate = useNavigate()

  return (
    <section className="home-section">
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

      <div className="hero-content">
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
          onClick={() => navigate('/products')}
        >
          <span>Explore Collection</span>
          <span className="button-glow"></span>
        </button>
      </div>
      <div className="hero-overlay"></div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" onClick={() => navigate('/products')}>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow-down"></div>
      </div>
    </section>
  )
}

export default Home
