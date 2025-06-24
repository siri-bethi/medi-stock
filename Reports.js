import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';

function Reports() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/viewstock")
      .then(res => res.json())
      .then(data => setStockData(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const lowCount = stockData.filter((item) => item.quantity < 50).length;
  const pieData = [
    { name: 'Low Stock', value: lowCount },
    { name: 'Healthy Stock', value: stockData.length - lowCount }
  ];
  const pieColors = ["#FF8042", "#00C49F"];

  return (
    <div>
      <h2>Reports</h2>

      <h3>Bar Chart: Quantity per Medicine</h3>
      <BarChart width={500} height={300} data={stockData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" />
      </BarChart>

      <h3>Pie Chart: Stock Health</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default Reports;