const express = require('express')
const router = express.Router();
const db = require('../db');


// GET

router.get('/words/:word_id', (req, res) => {
    const { word_id } = req.params;

    try {

        const sql = 'SELECT * FROM words WHERE id = ?'

        db.query(sql, [word_id], (err, result) => {
            if (err) {
                console.error('❌ get word error:', err);
                return res.status(500).json({
                    success: false,
                    data: null,
                    error: { code: 'SERVER_ERROR', message: '서버 에러' }
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    data: null,
                    error: { code: 'WORD_NOT_FOUND', message: '해당 단어 없음' }
                });
            }

            const word = result[0];

            return res.status(200).json({
                success: true,
                data: {
                    id: word.id,
                    level: word.level,
                    source: word.source,
                    word: word.word,
                    ps: word.ps,
                    meaning: word.meaning
                },
                error: null,
                message: '단어 정보 있음'
            });
        });

    } catch (error) {
        console.error('try catch error', error);
    }
});

// POST

router.post('/words', (req, res) => {
    const { level, source, word, ps, meaning } = req.body;

    try {

        const sql = 'INSERT INTO words (level, source, word, ps, meaning) VALUES (?,?,?,?,?)';

        db.query(sql, [level, source, word, ps, meaning], (err, result) => {
            if (err) {
                console.error('❌ post word error:', err);
                return res.status(500).json({
                    success: false,
                    data: null,
                    error: { code: 'SERVER_ERROR', message: '서버 에러' }
                });
            }

            if (result.affectedRows  === 0) {
                return res.status(404).json({
                    success: false,
                    data: null,
                    error: { code: 'INSERT_FAILED', message: '단어 저장 실패' }
                });
            }

            const word = result[0];

            return res.status(200).json({
                success: true,
                data: {
                    id: result.insertId,
                    level,
                    source,
                    word,
                    ps,
                    meaning
                },
                error: null,
                message: '단어가 성공적으로 저장됨'
            });
        });

    } catch (error) {
        console.error('try catch error', error);
    }
});

// DELETE

router.delete('/words/:id', (req, res) => {
    const { id } = req.params;

    try {
        const sql = 'DELETE FROM words WHERE id = ?'

        db.query(sql, [id], (err, result) => {
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
                    error: { code: 'WORD_NOT_FOUND', message: '해당 단어 없음' }
                });
            }

            return res.status(200).json({
                success: true,
                data: { id },
                error: null,
                message: '단어 삭제 성공'
            });
        });

    } catch (error) {
        console.error('❌ try-catch error:', error);
        return res.status(500).json({ message: '서버 에러' });
    }
});


module.exports = router;
