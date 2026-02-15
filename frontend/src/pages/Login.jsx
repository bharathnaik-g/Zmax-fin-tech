import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    
    localStorage.setItem('token', data.token);
    window.dispatchEvent(new Event('login'));
    
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-2 border rounded mb-4"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Login
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </>
  );
}

export default Login;
