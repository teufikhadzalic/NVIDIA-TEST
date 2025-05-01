const db = require("../database/pg.database");

exports.createItem = async ({ name, price, store_id, image_url, stock }) => {
    try {
        const res = await db.query(
            "INSERT INTO items (name, price, store_id, image_url, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, price, store_id, image_url, stock ?? 0]
        );

        if (res.rowCount === 0) {
            throw new Error("Failed to create item");
        }

        return res.rows[0];
    } catch (error) {
        console.error("Error in createItem:", error);
        throw error;
    }
};

//exports.updateItem = async (id, { name, price, store_id, image_url, stock }) => {
   // try {
      //  const res = await db.query(
        //    "UPDATE items SET name = $1, price = $2, store_id = $3, image_url = $4, stock = $5 WHERE id = $6 RETURNING *",
      //      [name, price, store_id, image_url, stock, id]
      //  );

     //   if (res.rowCount === 0) {
     //       throw new Error("Item not found or update failed");
     //   }

   //     return res.rows[0];
   // } catch (error) {
  //      console.error("Error in updateItem:", error);
   //     throw error;
   // }
 //};

   exports.updateItem = async (id, { stock }) => {
    try {
        const query = `
            UPDATE items
            SET stock = $1
            WHERE id = $2
            RETURNING *;
        `;
        const values = [stock, id];
        const result = await db.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating item stock:", error);
        throw error;
    }
};




exports.getItemById = async (id) => {
    try {
        const res = await db.query("SELECT * FROM items WHERE id = $1", [id]);
        return res.rows[0] || null;
    } catch (error) {
        console.error("Error in getItemById:", error);
        throw error;
    }
};

exports.getAllItems = async () => {
    try {
        const res = await db.query("SELECT * FROM items");

        if (res.rowCount === 0) {
            return [];
        }

        return res.rows;
    } catch (error) {
        console.error("Error in getAllItems:", error);
        throw error;
    }
};



exports.deleteItem = async (id) => {
    try {
        const res = await db.query("DELETE FROM items WHERE id = $1 RETURNING *", [id]);

        if (res.rowCount === 0) {
            throw new Error("Item not found or delete failed");
        }

        return res.rows[0];
    } catch (error) {
        console.error("Error in deleteItem:", error);
        throw error;
    }
};
