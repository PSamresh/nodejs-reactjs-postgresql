let express = require('express');
let router = express.Router();

const transactions = require('../controllers/controller.js');

router.post('/api/transaction', transactions.createTransaction);
router.get('/api/transaction/:id', transactions.getTransaction);
router.get('/api/transactions', transactions.transactions);
router.put('/api/transaction', transactions.updateTransaction);
router.delete('/api/transaction/:id', transactions.deleteTransaction);

module.exports = router;