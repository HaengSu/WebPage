require("dotenv").config();

const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/v1',authRoutes);

const usersRoutes = require('./routes/user');
app.use('/api/v1',usersRoutes );

const wordsRoutes = require('./routes/words');
app.use('/api/v1',wordsRoutes );

const bookmarsRoutes = require('./routes/bookmarks');
app.use('/api/v1',bookmarsRoutes );

const extractRoutes = require('./routes/extract')
app.use('/api/v1', extractRoutes);

app.listen(PORT, () => {
  console.log(`🚀 서버 실행됨: http://localhost:${PORT}`);
});




