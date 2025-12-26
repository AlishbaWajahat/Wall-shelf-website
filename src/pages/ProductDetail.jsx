import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function ProductDetail({ addToCart }) {
  const navigate = useNavigate()
  const [currentImage, setCurrentImage] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef(null)

  const product = {
    id: 1,
    name: 'Premium Wall Shelf',
    price: 30.00,
    images: ['/image 1.png', '/image 2.png'],
    description: 'Transform your space with our elegant, handcrafted wall shelf. Made with premium materials for lasting durability and timeless style.',
    features: [
      'Premium quality materials',
      'Easy installation',
      'Modern minimalist design',
      'Durable construction',
      'Perfect for any room'
    ]
  }

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleBuyNow = () => {
    window.open('https://whop.com/checkout/plan_gVw94z5MgcXLI', '_blank')
  }

  const handleAddToCart = () => {
    addToCart(product)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  // Auto-slide effect with infinite looping
  useEffect(() => {
    if (!isAutoPlaying || product.images.length <= 1 || isTransitioning) return

    const interval = setInterval(() => {
      nextImage()
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, product.images.length, isTransitioning])

  const nextImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentImage((prev) => (prev + 1) % product.images.length)
    setIsAutoPlaying(false)

    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlaying(true)
    }, 600) // Match CSS transition duration
  }

  const prevImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)
    setIsAutoPlaying(false)

    setTimeout(() => {
      setIsTransitioning(false)
      setIsAutoPlaying(true)
    }, 600)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextImage()
    } else if (isRightSwipe) {
      prevImage()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <div className="product-detail-page">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back
      </button>

      {/* Premium Image Carousel */}
      <div className="carousel-container">
        <div
          className="carousel"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${currentImage * 100}%)`,
            }}
          >
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentImage ? 'active' : ''}`}
              >
                <img
                  src={image}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="carousel-image"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {product.images.length > 1 && (
            <>
              <button
                className="carousel-btn prev"
                onClick={prevImage}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="carousel-btn next"
                onClick={nextImage}
                aria-label="Next image"
              >
                ›
              </button>
              <div className="carousel-dots">
                {product.images.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === currentImage ? 'active' : ''}`}
                    onClick={() => {
                      if (isTransitioning) return
                      setIsTransitioning(true)
                      setCurrentImage(index)
                      setIsAutoPlaying(false)
                      setTimeout(() => {
                        setIsTransitioning(false)
                        setIsAutoPlaying(true)
                      }, 600)
                    }}
                    aria-label={`Go to image ${index + 1}`}
                  ></span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="product-detail-info">
        <h1 className="product-detail-title">{product.name}</h1>
        <p className="product-detail-price">${product.price}</p>
        <p className="product-detail-description">{product.description}</p>

        {/* Features */}
        <div className="product-features">
          <h3>Features:</h3>
          <ul>
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="product-actions">
          <button className="buy-now-btn" onClick={handleBuyNow}>
            Buy Now
          </button>
          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="success-message">
            ✓ Added to cart!
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail
