const transactionRepository = require("../repositories/transaction.repository");
const baseResponse = require("../utils/baseResponse.util");

exports.createTransaction = async (req, res) => {
    try {
        const { user_id, item_id, quantity, total } = req.body;

        if (!user_id || !item_id || !quantity || !total) {
            return baseResponse(res, false, 400, "All fields are required");
        }

        const transaction = await transactionRepository.createTransaction({ user_id, item_id, quantity, total });

        return baseResponse(res, true, 201, "Transaction created", transaction);
    } catch (error) {
        return baseResponse(res, false, 500, error.message || "Server Error");
    }
};

exports.payTransaction = async (req, res) => {
    try {
        const { transaction_id } = req.body;

        if (!transaction_id) {
            return baseResponse(res, false, 400, "Transaction ID is required");
        }

        const updatedTransaction = await transactionRepository.payTransaction(transaction_id);

        if (!updatedTransaction) {
            return baseResponse(res, false, 404, "Transaction not found");
        }

        return baseResponse(res, true, 200, "Payment successful", updatedTransaction);
    } catch (error) {
        return baseResponse(res, false, 500, error.message || "Server Error");
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTransaction = await transactionRepository.deleteTransaction(id);

        if (!deletedTransaction) {
            return baseResponse(res, false, 404, "Transaction not found");
        }

        return baseResponse(res, true, 200, "Transaction deleted", deletedTransaction);
    } catch (error) {
        return baseResponse(res, false, 500, error.message || "Server Error");
    }
};
