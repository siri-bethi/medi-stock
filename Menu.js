import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Menu() {
  return (
    <div className='layout' >
      <nav className='side' >
        <h3 className='logo'>MediStock</h3>
        <ul className='navlist'>
          <li><Link to="addstock">Add Stock</Link></li>
          <li><Link to="viewstock">View Stock</Link></li>
          <li><Link to="orders">Orders</Link></li>
          <li><Link to="dispatch">Dispatch</Link></li>
          <li><Link to="reports">Reports</Link></li>
        </ul>
      </nav>
      <main className='main'>
        <Outlet />
      </main>
    </div>
  );
}

export default Menu;
