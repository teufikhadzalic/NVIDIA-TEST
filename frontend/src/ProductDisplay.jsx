import "./ProductDisplay.css"

const ProductDisplay = ({ product }) => {
  if (!product) return null

  return (
    <div className="product-display">
      <div className="product-display-header">
        <h2>{product.name}</h2>
        <p className="product-price">{product.price}</p>
      </div>

      <div className="product-display-content">
        <div className="product-display-image">
          <img src={product.image || "/placeholder.svg"} alt={product.name} />
        </div>

        <div className="product-display-details">
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-features">
            <h3>Key Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="product-actions">
            <button className="buy-now-btn">Buy Now</button>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay
