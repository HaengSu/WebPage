const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt"); // 비밀번호 암호화 라이브러리
const db = require('../db');

// 회원가입 API
router.post("/register", async (req, res) => {
  const { email, password, nickname, purpose, level } = req.body; // 프론트에서 전달받은 값

  if (!email || !password) {
    return res.status(400).json({ message: "이메일과 비밀번호를 입력하세요." });
  }

  try {
    // 비밀번호 암호화 (saltRounds=10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB에 사용자 저장
    const sql = "INSERT INTO users (email, password,nickname, purpose, level) VALUES (?, ?, ? ,? , ?)";
    db.query(sql, [email, hashedPassword, nickname, purpose, level], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "이미 가입된 이메일입니다." });
        }
        console.error("❌ 회원가입 에러:", err);
        return res.status(500).json({ message: "서버 에러" });
      }
      return res.status(201).json({ message: "회원가입 성공!" });
    });
  } catch (error) {
    console.error("❌ 비밀번호 암호화 에러:", error);
    return res.status(500).json({ message: "서버 에러" });
  }
});

router.post('/login', async (req, res) => {
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
          level : user.level
        }
      });
    })
  } catch(error) {
    console.error('서버에러 : ',error);
    return res.status(500).json({message : '서버 에러'});
  }
})

module.exports = router;