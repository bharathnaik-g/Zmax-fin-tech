import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import AddTransaction from './pages/AddTransaction';
import Analytics from './pages/Analytics';

function App() {
  const [authPage, setAuthPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('transactions');

  // Listen for login event
  useEffect(() => {
    const handleLogin = () => {
      setIsLoggedIn(true);
    };

    window.addEventListener('login', handleLogin);
    return () => window.removeEventListener('login', handleLogin);
  }, []);

  // LOGOUT
  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setAuthPage('login');
  };

  // DASHBOARD
  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex bg-gray-100">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-blue-600">
              FinTech
            </h2>
          </div>

          <nav className="p-4 space-y-3">
            <button
              onClick={() => setActivePage('transactions')}
              className={`w-full text-left px-4 py-2 rounded 
                ${activePage === 'transactions'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-200'}`}
            >
              📋 Transactions
            </button>

            <button
              onClick={() => setActivePage('analytics')}
              className={`w-full text-left px-4 py-2 rounded 
                ${activePage === 'analytics'
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-200'}`}
            >
              📊 Analytics
            </button>
          </nav>
        </aside>

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col">
          {/* TOP BAR */}
          <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-semibold">
              {activePage === 'transactions' ? 'Transactions' : 'Analytics'}
            </h1>

            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </header>

          {/* CONTENT */}
          <main className="p-8">
            {activePage === 'transactions' && <AddTransaction />}
            {activePage === 'analytics' && <Analytics />}
          </main>
        </div>
      </div>
    );
  }

  // LOGIN / REGISTER
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow w-96">
        {authPage === 'login' && <Login />}
        {authPage === 'register' && <Register />}

        <p className="text-center mt-4 text-blue-600 cursor-pointer">
          {authPage === 'login' ? (
            <span onClick={() => setAuthPage('register')}>
              New user? Register
            </span>
          ) : (
            <span onClick={() => setAuthPage('login')}>
              Already have an account?
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default App;
