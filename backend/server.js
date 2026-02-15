const express = require('express');
require('dotenv').config({ path: __dirname + '/.env' });

const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/transactions', require('./routes/transactions'));

app.get('/', (req, res) => {
  res.send('HC-401 Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
