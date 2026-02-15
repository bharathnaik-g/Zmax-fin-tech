import { useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const register = async () => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    setMsg(res.ok ? 'Registered successfully' : data.message);
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Name"
        onChange={e => setName(e.target.value)}
      />

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
        onClick={register}
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Register
      </button>

      {msg && <p className="mt-2">{msg}</p>}
    </>
  );
}

export default Register;
