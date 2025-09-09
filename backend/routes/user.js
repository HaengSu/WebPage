const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt"); // 비밀번호 암호화 라이브러리
const db = require('../db');


// GET
router.get('/users/:email', (req, res) => {
    const { email } = req.params;

    try {
        const sql = 'SELECT id,email,nickname,purpose, level FROM users WHERE email = ?';

        db.query(sql, [email], (err, result) => {
            if (err) {
                return res.status(500).json({ message: '서버에러' });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: '해당 유저가 없습니다.' });
            }

            return res.status(200).json({
                success: true,
                data: result[0],
                error: null
            })
        })

    } catch (error) {
        return res.status(500).json({ message: '서버 에러' })
    }
});



// POST

// 회원가입 API
router.post("/users", async (req, res) => {
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
            return res.status(200).json({ message: "회원가입 성공!" });
        });
    } catch (error) {
        console.error("❌ 비밀번호 암호화 에러:", error);
        return res.status(500).json({ message: "서버 에러" });
    }
});


// PATCH

// 유저 수준 변경
router.patch('/users/:email', (req, res) => {
    const { email } = req.params;
    const { level } = req.body;

    try {
        const sql = 'UPDATE users SET level = COALESCE(?, level) WHERE email = ?';

        db.query(sql, [level, email], (err, result) => {
            if (err) {
                console.error('❌ level update error:', err);
                return res.status(500).json({ message: '서버 에러' });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: '해당 유저 없음' });
            }

            return res.status(200).json({ message: 'success update user level' });
        });
    } catch (error) {
        console.error('❌ try-catch error:', error);
        return res.status(500).json({ message: '서버 에러' });
    }
});


//DELETE

router.delete('/users/:email', (req, res) => {
    const { email } = req.params;

    try {
        const sql = 'DELETE FROM users WHERE email = ?'

        db.query(sql, [email], (err, result) => {
            if (err) {
                console.error('❌ delete error:', err);
                return res.status(500).json({
                    success: false,
                    data: null,
                    error: { code: 'SERVER_ERROR', message: '서버 에러' }
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    data: null,
                    error: { code: 'USER_NOT_FOUND', message: '해당 유저 없음' }
                });
            }

            return res.status(200).json({
                success: true,
                data: { email },
                error: null,
                message: '유저 삭제 성공'
            });
        });

    } catch (error) {
        console.error('❌ try-catch error:', error);
        return res.status(500).json({ message: '서버 에러' });
    }
});


module.exports = router;