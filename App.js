import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './Register';
import Menu from './Menu';
import Orders from './Orders';
import Reports from './Reports';
import Login from './Login';
import ForgotPassword from './Forgotpassword';
import AddStock from './Addstock';
import ViewStock from './Viewstock';
import Dispatch from './Dispatch'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        <Route path="/menu" element={<Menu />}>
          <Route path="addstock" element={<AddStock />} />
          <Route path="viewstock" element={<ViewStock />} />
          <Route path="orders" element={<Orders />} />
          <Route path="dispatch" element={<Dispatch />} />
          <Route path="reports" element={<Reports />} />
           
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
