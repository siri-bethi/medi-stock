import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Forgotpassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleReset = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/generatepass', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const msg = await res.text();
    setMessage(msg);
    if(res.ok)
    {
      navigate('/');
    }
  };

  return (
    <div className='box'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleReset}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <br></br>
        <button type="submit">Send Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Forgotpassword;
