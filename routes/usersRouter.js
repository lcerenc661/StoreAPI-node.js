const express = require('express')

const router = express.Router()

/*QUERY PARAMS != PARAMS */
/*QUERY PARAMS =  Pagination - Limit - Offset -Filtering */
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No params founded');
  }
});

module.exports = router
