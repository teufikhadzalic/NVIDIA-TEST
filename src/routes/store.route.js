const storeController = require("../controllers/store.controller");
const express = require('express');
const router = express.Router();

router.get('/getAll', storeController.getAllStores);

router.post('/create', storeController.createStore);
//baru
router.get('/:id', storeController.getStoreById);
//baru2
router.put('/update', storeController.updateStore);

module.exports = router;