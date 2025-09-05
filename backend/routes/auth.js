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
    db.query(sql, [email, hashedPassword,nickname, purpose, level ], (err, result) => {
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

module.exports = router;