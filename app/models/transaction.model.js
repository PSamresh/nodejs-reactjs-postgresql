module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        amount: {
            type: Sequelize.INTEGER
        },
        memo: {
            type: Sequelize.STRING
        },
        txndate: {
            type: Sequelize.DATE
        },
        assignto: {
            type: Sequelize.STRING
        },
        gst: {
            type: Sequelize.STRING
        }
    });

    return Transaction;
}