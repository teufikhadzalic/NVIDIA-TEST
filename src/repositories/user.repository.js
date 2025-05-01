const db = require("../database/pg.database");

exports.registerUser = async (user) => {
    try {
        const res = await db.query(
            "INSERT INTO users (name, email, password, balance) VALUES ($1, $2, $3, $4) RETURNING *",
            [user.name, user.email, user.password, user.balance || 0]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};

exports.getUserByEmail = async (email) => {
    try {
        console.log("Fetching user by email:", email);
        const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        console.log("User fetch result:", res.rows);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query in getUserByEmail:", error);
        throw error; // Pastikan error dilempar agar ditangani di controller
    }
};

exports.updateUser = async (user) => {
    try {
        const query = `
            UPDATE users 
            SET name = $1, 
                password = COALESCE($2, password), 
                balance = COALESCE($3, balance) 
            WHERE email = $4 
            RETURNING *`;
        
        const res = await db.query(query, [user.name, user.password, user.balance, user.email]);
        return res.rows[0] || null;
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
};


exports.deleteUser = async (id) => {
    try {
        const res = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.topUpUser = async (user_id, amount) => {
    const query = `
        UPDATE users 
        SET balance = balance + $1 
        WHERE id = $2 
        RETURNING *;
    `;
    const values = [amount, user_id];
    const result = await db.query(query, values);
    return result.rowCount > 0 ? result.rows[0] : null;
};
