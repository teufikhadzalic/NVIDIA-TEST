import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { getAllItems } from "./api";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Ambil data pengguna dari localStorage
  const [items, setItems] = useState([]); // State untuk menyimpan item
  const [error, setError] = useState("");

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

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      {user && (
        <div className="user-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Balance:</strong> ${user.balance}</p>
        </div>
      )}

      <h2>All Items Sold</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="items-list">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="item-card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <p><strong>Stock:</strong> {item.stock}</p>
            </div>
          ))
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;