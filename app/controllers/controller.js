const db = require('../config/db.config.js');
const Transaction = db.Transaction;

/**
 * Save a transaction object to database MySQL/PostgreSQL
 * @param {*} req 
 * @param {*} res 
 */
exports.createTransaction = (req, res) => {
    let transaction = {};

    try {
        // Building transaction object from upoading request's body

        //transaction.id = req.body.id;
        transaction.amount = req.body.amount;
        transaction.memo = req.body.memo;
        transaction.txndate = req.body.txndate;
        transaction.assignto = req.body.assignto;
        transaction.gst = req.body.gst;

        // Save to MySQL database
        Transaction.create(transaction,
            { attributes: ['id', 'amount', 'memo', 'txndate', 'assignto', "gst"] })
            .then(result => {
                res.status(200).json(result);
            });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

/**
 * Retrieve transaction information from database
 * @param {*} req 
 * @param {*} res 
 */
exports.transactions = (req, res) => {
    // find all transaction information from 
    try {
        Transaction.findAll({ attributes: ['id', 'amount', 'memo', 'txndate', 'assignto', 'gst'] })
            .then(transactions => {
                res.status(200).json(transactions);
            })
    } catch (error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.getTransaction = (req, res) => {
    Transaction.findByPk(req.params.id,
        { attributes: ['id', 'amount', 'memo', 'txndate', 'assignto', 'gst'] })
        .then(transaction => {
            res.status(200).json(transaction);
        }).catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        })
}

/**
 * Updating a transaction
 * @param {*} req 
 * @param {*} res 
 */
exports.updateTransaction = async (req, res) => {
    try {
        let transaction = await Transaction.findByPk(req.body.id);

        if (!transaction) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a transaction with id = " + transactionId,
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {

                //  id = req.body.id,
                amount: req.body.amount,
                memo: req.body.memo,
                txndate: req.body.txndate,
                assignto: req.body.assignto,
                gst: req.body.gst

            }
            let result = await Transaction.update(updatedObject,
                {
                    returning: true,
                    where: { id: req.body.id },
                    attributes: ['id', 'amount', 'memo', 'txndate', 'assignto', 'gst']
                }
            );

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a transaction with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a transaction with id = " + req.params.id,
            error: error.message
        });
    }
}

/**
 *  Delete a transaction by ID
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteTransaction = async (req, res) => {
    try {
        let transactionId = req.params.id;
        let transaction = await Transaction.findByPk(transactionId);

        if (!transaction) {
            res.status(404).json({
                message: "Does Not exist a Transaction with id = " + transactionId,
                error: "404",
            });
        } else {
            await transaction.destroy();
            res.status(200);
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a transaction with id = " + req.params.id,
            error: error.message
        });
    }
}