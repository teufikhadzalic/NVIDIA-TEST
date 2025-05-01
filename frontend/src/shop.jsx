import React, { useState, useEffect } from "react";
import { getAllItems, buyItem } from "./api";
import "./shop.css";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getAllItems();
        setItems(response.data.payload); // Simpan item ke state
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items.");
      }
    };

    fetchItems();
  }, []);

  const handleBuy = async (id) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await buyItem(id, 1); // Beli 1 item
      setSuccess("Item purchased successfully!");
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, stock: response.data.payload.stock } : item
        )
      );
    } catch (err) {
      console.error("Error purchasing item:", err);
      setError(err.response?.data?.message || "Failed to purchase item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shop-container">
      <div className="shop-header">
        <h1>Shop NVIDIA Products</h1>
        <p>Discover our cutting-edge technology solutions</p>
      </div>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="product-list">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="product-card">
              <div className="product-image">
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.name}
                />
              </div>
              <div className="product-info">
                <h2>{item.name}</h2>
                <p className="product-price">${item.price}</p>
                <p className="product-stock">
                  <strong>Stock:</strong> {item.stock}
                </p>
                <button
                  className="buy-btn"
                  onClick={() => handleBuy(item.id)}
                  disabled={loading || item.stock <= 0}
                >
                  {item.stock > 0 ? "Buy Now" : "Out of Stock"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items-message">No items available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;