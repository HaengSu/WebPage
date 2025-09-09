const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

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


app.listen(PORT, () => {
  console.log(`🚀 서버 실행됨: http://localhost:${PORT}`);
});




