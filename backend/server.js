const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/auth',authRoutes);


app.listen(PORT, () => {
  console.log(`🚀 서버 실행됨: http://localhost:${PORT}`);
});




