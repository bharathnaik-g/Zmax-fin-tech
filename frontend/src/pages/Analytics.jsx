import { useEffect, useState } from 'react';

function Analytics() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('/api/transactions', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setTransactions(data);

        let inc = 0;
        let exp = 0;
        const categoryMap = {};

        data.forEach(t => {
          if (t.type === 'income') {
            inc += t.amount;
          } else {
            exp += t.amount;
            categoryMap[t.category] =
              (categoryMap[t.category] || 0) + t.amount;
          }
        });

        setIncome(inc);
        setExpense(exp);

        // INCOME VS EXPENSE CHART
        const ieCanvas = document.getElementById('incomeExpenseChart');
        if (ieCanvas) {
          if (ieCanvas.chart) ieCanvas.chart.destroy();

          ieCanvas.chart = new window.Chart(ieCanvas, {
            type: 'pie',
            data: {
              labels: ['Income', 'Expense'],
              datasets: [
                {
                  data: [inc, exp],
                  backgroundColor: ['#16a34a', '#dc2626']
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom' }
              }
            }
          });
        }

        // CATEGORY-WISE CHART
        const catCanvas = document.getElementById('categoryChart');
        if (catCanvas) {
          if (catCanvas.chart) catCanvas.chart.destroy();

          catCanvas.chart = new window.Chart(catCanvas, {
            type: 'pie',
            data: {
              labels: Object.keys(categoryMap),
              datasets: [
                {
                  data: Object.values(categoryMap),
                  backgroundColor: [
                    '#2563eb',
                    '#16a34a',
                    '#dc2626',
                    '#ca8a04',
                    '#7c3aed',
                    '#0d9488'
                  ]
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'bottom' }
              }
            }
          });
        }
      });
  }, []);

  return (
    <div className="space-y-6">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded text-center">
          <p>Total Income</p>
          <h2 className="text-xl font-bold">₹{income}</h2>
        </div>

        <div className="bg-red-100 p-4 rounded text-center">
          <p>Total Expense</p>
          <h2 className="text-xl font-bold">₹{expense}</h2>
        </div>

        <div className="bg-blue-100 p-4 rounded text-center">
          <p>Balance</p>
          <h2 className="text-xl font-bold">₹{income - expense}</h2>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-4">Income vs Expense</h2>
          <div className="h-64">
            <canvas id="incomeExpenseChart"></canvas>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold mb-4">Expense by Category</h2>
          <div className="h-64">
            <canvas id="categoryChart"></canvas>
          </div>
        </div>
      </div>

      {/* TRANSACTIONS TABLE */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="font-bold mb-4">All Transactions</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Type</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map(txn => (
              <tr key={txn._id}>
                <td className="border p-2 capitalize">
                  {txn.type}
                </td>
                <td className="border p-2">
                  {txn.category}
                </td>
                <td
                  className={`border p-2 font-semibold ${
                    txn.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  ₹{txn.amount}
                </td>
                <td className="border p-2">
                  {new Date(txn.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
