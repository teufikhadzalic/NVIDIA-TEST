const db = require("../database/pg.database");

exports.createTransaction = async (transactionData) => {
    const { user_id, item_id, quantity, total } = transactionData;
    const query = `
        INSERT INTO transactions (user_id, item_id, quantity, total)
        VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [user_id, item_id, quantity, total];
    const result = await db.query(query, values);
    return result.rows[0];
};

exports.payTransaction = async (transaction_id) => {
    const query = `
        UPDATE transactions 
        SET status = 'paid' 
        WHERE id = $1 RETURNING *;
    `;
    const values = [transaction_id];
    const result = await db.query(query, values);
    return result.rowCount > 0 ? result.rows[0] : null;
};

exports.deleteTransaction = async (id) => {
    const query = `
        DELETE FROM transactions 
        WHERE id = $1 RETURNING *;
    `;
    const values = [id];
    const result = await db.query(query, values);
    return result.rowCount > 0 ? result.rows[0] : null;
};
