import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, pass, email })
    });
    const msg = await res.text();
    setMessage(msg);
    if (res.ok) {
      navigate('/');
    }
  };

  return (
    <div className='box'>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <br></br>
        <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} required /><br />
        <br></br>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <br></br>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Register;