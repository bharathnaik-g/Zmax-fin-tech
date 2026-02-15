import { useState } from 'react';

function AddTransaction() {
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const add = async () => {
    const token = localStorage.getItem('token');

    await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ type, category, amount })
    });

    alert('Transaction added');
    setCategory('');
    setAmount('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-lg">
    <h3 className="text-lg font-bold mb-4">Add Transaction</h3>
      <select
        className="w-full p-2 border rounded mb-3"
        onChange={e => setType(e.target.value)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        className="w-full p-2 border rounded mb-3"
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />

      <input
        type="number"
        className="w-full p-2 border rounded mb-4"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <button
        onClick={add}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        Add
      </button>
    </div>
  );
}

export default AddTransaction;
