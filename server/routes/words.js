const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * GET /api/words
 * Query params:
 *   - page (default=1)
 *   - limit (default=10)
 *   - search (default='')
 */
router.get('/', (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;

  // Basic LIKE search across all 4 text columns
  const sql = `
    SELECT *
    FROM words
    WHERE wordFirstLang LIKE ?
       OR sentenceFirstLang LIKE ?
       OR wordSecondLang LIKE ?
       OR sentenceSecondLang LIKE ?
    LIMIT ? OFFSET ?
  `;
  const params = [
    `%${search}%`,
    `%${search}%`,
    `%${search}%`,
    `%${search}%`,
    limit,
    offset,
  ];

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Count total matching rows to calculate total pages
    const countSql = `
      SELECT COUNT(*) as total
      FROM words
      WHERE wordFirstLang LIKE ?
         OR sentenceFirstLang LIKE ?
         OR wordSecondLang LIKE ?
         OR sentenceSecondLang LIKE ?
    `;
    const countParams = [
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
      `%${search}%`,
    ];

    db.get(countSql, countParams, (errCount, countRow) => {
      if (errCount) {
        return res.status(500).json({ error: errCount.message });
      }
      return res.json({
        data: rows,
        total: countRow.total,
      });
    });
  });
});

/**
 * PUT /api/words/:id
 * Body: {
 *   wordFirstLang, 
 *   sentenceFirstLang,
 *   wordSecondLang,
 *   sentenceSecondLang
 * }
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    wordFirstLang,
    sentenceFirstLang,
    wordSecondLang,
    sentenceSecondLang,
  } = req.body;

  const sql = `
    UPDATE words
    SET 
      wordFirstLang = ?, 
      sentenceFirstLang = ?,
      wordSecondLang = ?,
      sentenceSecondLang = ?
    WHERE id = ?
  `;
  const params = [
    wordFirstLang,
    sentenceFirstLang,
    wordSecondLang,
    sentenceSecondLang,
    id,
  ];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // "this.changes" tells how many rows were actually updated
    return res.json({ updated: this.changes });
  });
});

module.exports = router;