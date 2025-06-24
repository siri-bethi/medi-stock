import React, { useState } from 'react';

function ViewStock() {
  const [stockList, setStockList] = useState([]);
  const [message, setMessage] = useState('');

  const loadStock = async () => {
    const response = await fetch('http://localhost:4000/viewstock');
    const data = await response.json();

    if (data.length === 0) {
      setMessage('No stock found.');
      setStockList([]);
    } else {
      setStockList(data);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>View Stock</h2>
      <button onClick={loadStock}>Load Stock</button><br /><br />
      {message && <p>{message}</p>}
      {stockList.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Quantity</th><th>Price</th><th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            {stockList.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.medicinename}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.expirydate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewStock;