import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, pass })
    });
    const msg = await res.text();
    setMessage(msg);
    if (msg === 'Login Success') {
      navigate('/menu/viewstock');
    }
  };

  return (
    <div className='box'>
      <h2>Login</h2>
      <form onSubmit={handleLogin} >
        <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <br></br>
        <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} required /><br />
        <br></br>
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/forgot')} className='row center'>Forgot Password?</button><br />
      <button onClick={() => navigate('/register')} className='row center'>Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;