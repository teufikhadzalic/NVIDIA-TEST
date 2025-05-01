const storeRepository = require("../repositories/store.repository.js")
const baseResponse = require("../utils/baseResponse.util");

exports.getAllStores = async (req, res) => {
    try {
    const stores = await storeRepository.getAllStores();
    baseResponse(res, true, 200, "Stores retrieved succesfully", stores);
  
    } catch (error) {
    baseResponse(res, false, 500, "Error retrieving stores", error);
    
    }
}; 


//baru
exports.getStoreById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return baseResponse(res, false, 400, "Store ID is required");
    }

    try {
        const store = await storeRepository.getStoreById(id);
        if (!store) {
            return baseResponse(res, false, 404, "Store not found");
        }
        baseResponse(res, true, 200, "Store retrieved successfully", store);
    } catch (error) {
        baseResponse(res, false, 500, "Error retrieving store", error);
    }
};
//baru2
exports.updateStore = async (req, res) => {
    const { id, name, address } = req.body;
    if (!id || !name || !address) {
        return baseResponse(res, false, 400, "ID, name, and address are required");
    }

    try {
        const updatedStore = await storeRepository.updateStore({ id, name, address });
        if (!updatedStore) {
            return baseResponse(res, false, 404, "Store not found");
        }
        baseResponse(res, true, 200, "Store updated successfully", updatedStore);
    } catch (error) {
        baseResponse(res, false, 500, "Error updating store", error);
    }
};




exports.createStore = async (req, res) => {
    if (!req.body.name || !req.body.address) {
    return baseResponse(res, false, 400, "Name and address are required");
    }
    try {
    const store = await storeRepository.createStore(req.body);
    baseResponse(res, true, 201, "Store created successfully", store);
    } catch (error) {
    baseResponse(res, false, 500, error.message || "Server Error", error);
    }
};
