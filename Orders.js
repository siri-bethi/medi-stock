import React, { useState } from 'react';

function Orders() {
  const [medicinename, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleOrder = async (e) => {
    e.preventDefault();
    const order = { medicinename, quantity, email };

    const response = await fetch('http://localhost:4000/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    const msg = await response.text();
    setMessage(msg);
    if (response.ok) {
      setProductName(''); setQuantity(''); setEmail('');
    }
  };

  return (
    <div>
      <h2>Place Order</h2>
      <form onSubmit={handleOrder}>
        <input type="text" placeholder="Product Name" value={medicinename} onChange={(e) => setProductName(e.target.value)} required /><br />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /><br />
        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <button type="submit">Order</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Orders;
