const express = require('express')
const router = express.Router();
const db = require('../db');


// GET

router.get('/bookmarks', (req, res) => {

    try {
        const sql = 'SELECT * FROM bookmarks'

        db.query(sql, [], (err, result) => {
            if (err) {
                console.error('❌ get bookmarks error:', err);
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
                    error: { code: 'BOOKMARK_NOT_FOUND', message: '북마크 없음' }
                });
            }

            const bookamrk = result[0];

            return res.status(200).json({
                success: true,
                data: {
                    bookamrk
                    //추후 값 확인 후 수정 필요
                },
                error: null,
                message: '북마크 있음'
            });
        });

    } catch (error) {
        console.error('try catch error', error);
    }
});

router.patch('/bookmarks/:user_id', (req, res) => {
    const { user_id } = req.params;

    try {

        const sql = 'SELECT * FROM bookmarks WHERE user_id = ?'

        db.query(sql, [user_id], (err, result) => {
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
                    error: { code: 'BOOKMARK_NOT_FOUND', message: '해당 북마크 없음' }
                });
            }

            const bookamrk = result;

            return res.status(200).json({
                success: true,
                bookmarks: {
                    result
                },
                error: null,
                message: '북마크 정보 있음'
            });
        });

    } catch (error) {
        console.error('try catch error', error);
    }
});

// POST

router.post('/bookmarks', (req, res) => {
    const { user_id, word_id } = req.body;

    try {

        const sql = 'INSERT INTO bookmarks (user_id, word_id) VALUES (?,?)';

        db.query(sql, [user_id, word_id], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    console.error('❌ post bookmarks error:', err);
                    return res.status(400).json({
                        success: false,
                        data: null,
                        error: { code: 'ER_DUP_ENTRY', message: '이미 추가한 북마크입니다' }
                    });
                } else {
                    console.error('❌ post bookmarks error:', err);
                    return res.status(500).json({
                        success: false,
                        data: null,
                        error: { code: 'SERVER_ERROR', message: '서버 에러' }
                    });
                }
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    data: null,
                    error: { code: 'INSERT_FAILED', message: '북마크 저장 실패' }
                });
            }

            const bookmark = result[0];

            return res.status(200).json({
                success: true,
                data: {
                    id: result.insertId,
                    user_id,
                    word_id
                },
                error: null,
                message: '북마크가 성공적으로 저장됨'
            });
        });

    } catch (error) {
        console.error('try catch error', error);
    }
});

// DELETE

router.delete('/bookmarks/:id', (req, res) => {
    const { id } = req.params;

    try {
        const sql = 'DELETE FROM bookmarks WHERE id = ?'

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
                    error: { code: 'BOOKMARK_NOT_FOUND', message: '해당 북마크 없음' }
                });
            }

            return res.status(200).json({
                success: true,
                data: { id },
                error: null,
                message: '북마크 삭제 성공'
            });
        });

    } catch (error) {
        console.error('❌ try-catch error:', error);
        return res.status(500).json({ message: '서버 에러' });
    }
});


module.exports = router;
