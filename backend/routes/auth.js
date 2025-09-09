const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt"); // 비밀번호 암호화 라이브러리
const db = require('../db');

router.post('auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (email == false || password == false) {
    return res.status(400).json({ message: '이메일과 비밀번호를 입력하세요.' });
  }

  try {

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, result) => {
      if (err) {
        console.error("로그인 에러 : " + err);
        return res.status(500).json({ message: '서버 에러' })
      }

      if (result.length === 0) {
        return res.status(401).json({ message: '존재하지 않는 이메일 입니다.' });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch == false) {
        return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
      }

      return res.status(200).json({
        message: '로그인 성공', user: {
          email: user.email,
          nickname: user.nickname,
          purpose: user.purpose,
          level: user.level
        }
      });
    })
  } catch (error) {
    console.error('서버에러 : ', error);
    return res.status(500).json({ message: '서버 에러' });
  }
});


module.exports = router;