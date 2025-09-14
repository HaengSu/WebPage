require("dotenv").config();

const express = require('express');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);

const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // React 앱 주소
  credentials: true                // 쿠키/세션 공유 허용
}));
app.use(express.json());

const sessionStore = new MYSQLStore({
  host : 'localhost',
  user : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE,
  createDatabaseTable : true
})

app.use(session({
  key: 'admin',
  secret : process.env.MYSQL_PASSWORD,
  resave : false,
  saveUninitialized : false,
  store : sessionStore,
  cookie : {
    maxAge : 1000 * 60 * 60, //1시간
    httpOnly : true
  }
}));



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




