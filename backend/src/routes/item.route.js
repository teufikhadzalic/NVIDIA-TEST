const express = require("express");
const multer = require("multer");
const itemController = require("../controllers/item.controller");
const { upload } = require("../utils/upload.utils"); // Gunakan upload dari utils, hapus yang lain

const router = express.Router();

router.post("/create", upload.single("image"), itemController.createItem);
router.put("/update", upload.single("image"), itemController.updateItem);
router.delete("/:id", itemController.deleteItem);
router.get("/getAll", itemController.getAllItems);
router.get("/:id", itemController.getItemById);
router.get("/byStoreId/:store_id", itemController.getItemsByStoreId);
router.put("/buy/:id", itemController.buyItem); // Endpoint untuk membeli item

module.exports = router;
