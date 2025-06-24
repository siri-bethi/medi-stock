import React, { useState, useEffect } from 'react';

function Dispatch() {
  const [stockList, setStockList] = useState([]);
  const [selectedMed, setSelectedMed] = useState('');
  const [quantity, setQuantity] = useState('');
  const [hospital, setHospital] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
  fetch('http://localhost:4000/viewstock')
    .then(res => res.json())
    .then(data => setStockList(data));
}, []);
  
  const handleDispatch = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/dispatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        medicinename: selectedMed,
        quantity: quantity,
        hospital: hospital
      }),
    });

    const result = await response.text();
    setMessage(result.message);
  


    setQuantity('');
    setHospital('');
    setSelectedMed('');

 
    fetch('http://localhost:4000/viewstock')
    .then(res => res.json())
    .then(data => setStockList(data))
  };

  return (
    <div className="dispatch-container">
      <h2 className="dispatch-heading">Dispatch Stock to Hospital</h2>
      <form onSubmit={handleDispatch} className="dispatch-form">
        <label className="dispatch-label">Medicine:</label>
        <select value={selectedMed} onChange={e => setSelectedMed(e.target.value)} className="dispatch-input">
          <option value="">Select</option>
          {stockList.map((item) => (
            <option key={item.id} value={item.medicinename}>{item.medicinename}</option>
          ))}
        </select>

        <label className="dispatch-label">Hospital:</label>
        <input type="text" value={hospital} onChange={e => setHospital(e.target.value)} className="dispatch-input" />

        <label className="dispatch-label">Quantity:</label>
        <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} className="dispatch-input" />

        <button type="submit" className="dispatch-button">Dispatch</button>
      </form>
      {message && <p className="dispatch-message">{message}</p>}
    </div>
  );
}

export default Dispatch;
