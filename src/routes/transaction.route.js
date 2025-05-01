const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

// Membuat transaksi
router.post("/create", transactionController.createTransaction);

// Membayar transaksi
router.put("/pay", transactionController.payTransaction);

// Menghapus transaksi berdasarkan ID
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
