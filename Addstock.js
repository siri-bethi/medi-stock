import React, { useState } from 'react';

function AddStock() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [expiry, setExpiry] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const stockData = { name, quantity, price, expiry };

    try {
      const response = await fetch('http://localhost:4000/addstock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockData)
      });
      const result = await response.text();
      setMessage(result);
      if (response.ok) {
        setName(''); setQuantity(''); setPrice(''); setExpiry('');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Add Stock</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /><br />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required /><br />
        <input type="date" value={expiry} onChange={(e) => setExpiry(e.target.value)} required /><br />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddStock;