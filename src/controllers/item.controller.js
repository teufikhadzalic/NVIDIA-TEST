const itemRepository = require("../repositories/item.repository");
const baseResponse = require("../utils/baseResponse.util");
const { uploadToCloudinary } = require("../utils/upload.utils");

exports.createItem = async (req, res) => {
    try {
        // Menangkap data dari body request dan file gambar
        const { name, price, store_id, stock } = req.body;
        let image_url = null;

        if (!req.file) {
            return baseResponse(res, false, 400, "No file uploaded");
        }

        // Mengunggah gambar ke Cloudinary
        const result = await uploadToCloudinary(req.file.path, "items");
        image_url = result.secure_url;

        // Menyimpan item baru ke database
        const newItem = await itemRepository.createItem({ name, price, store_id, image_url, stock });

        return baseResponse(res, true, 201, "Item created successfully", newItem);
    } catch (error) {
        console.error("Error in createItem:", error);
        return baseResponse(res, false, 500, error.message || "Server Error");
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id, name, price, store_id, stock } = req.body;

        // Validasi ID
        if (!id || isNaN(id)) {
            return baseResponse(res, false, 400, "Valid ID is required");
        }

        // Validasi field lain
        if (!name || !price || !store_id) {
            return baseResponse(res, false, 400, "Name, price, and store_id are required");
        }

        let image_url = null;
        
        if (req.file) {
            // Mengunggah gambar baru ke Cloudinary jika ada
            const uploadResult = await uploadToCloudinary(req.file.path, "items");
            image_url = uploadResult.secure_url;
        }

        // Memperbarui item di database
        const updatedItem = await itemRepository.updateItem(id, { name, price, store_id, image_url, stock });

        return baseResponse(res, true, 200, "Item updated successfully", updatedItem);
    } catch (error) {
        console.error("Error in updateItem:", error);
        return baseResponse(res, false, 500, error.message || "Server Error");
    }
};

exports.getItemById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validasi ID
        if (!id || isNaN(id)) {
            return baseResponse(res, false, 400, "Valid ID is required");
        }

        // Mengambil item dari database berdasarkan ID
        const item = await itemRepository.getItemById(id);

        if (!item) {
            return baseResponse(res, false, 404, "Item not found");
        }

        return baseResponse(res, true, 200, "Item found", item);
    } catch (error) {
        console.error("Error in getItemById:", error);
        return baseResponse(res, false, 500, "Error retrieving item", error);
    }
};

exports.getItemsByStoreId = async (req, res) => {
    try {
        const { store_id } = req.params;

        // Validasi store_id
        if (!store_id || isNaN(store_id)) {
            return baseResponse(res, false, 400, "Valid store_id is required");
        }

        // Mengambil semua item dari database berdasarkan store_id
        const items = await itemRepository.getItemsByStoreId(store_id);

        if (items.length === 0) {
            return baseResponse(res, false, 404, "No items found for this store");
        }

        return baseResponse(res, true, 200, "Items retrieved successfully", items);
    } catch (error) {
        console.error("Error in getItemsByStoreId:", error);
        return baseResponse(res, false, 500, "Error retrieving items by store ID", error);
    }
};

exports.getAllItems = async (req, res) => {
    try {
        // Mengambil semua item dari database
        const items = await itemRepository.getAllItems();

        return baseResponse(res, true, 200, "Items retrieved successfully", items);
    } catch (error) {
        console.error("Error in getAllItems:", error);
        return baseResponse(res, false, 500, "Error retrieving items", error);
    }
};

exports.buyItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return baseResponse(res, false, 400, "Invalid quantity");
        }

        const item = await itemRepository.getItemById(id);
        if (!item) {
            return baseResponse(res, false, 404, "Item not found");
        }

        if (item.stock < quantity) {
            return baseResponse(res, false, 400, "Not enough stock available");
        }

        const updatedItem = await itemRepository.updateItem(id, {
            stock: item.stock - quantity,
        });

        return baseResponse(res, true, 200, "Item purchased successfully", updatedItem);
    } catch (error) {
        console.error("Error in buyItem:", error);
        return baseResponse(res, false, 500, "Error purchasing item", error);
    }
};




exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        // Validasi ID
        if (!id || isNaN(id)) {
            return baseResponse(res, false, 400, "Valid ID is required");
        }

        // Menghapus item dari database
        const deletedItem = await itemRepository.deleteItem(id);

        if (!deletedItem) {
            return baseResponse(res, false, 404, "Item not found");
        }

        return baseResponse(res, true, 200, "Item deleted successfully", deletedItem);
    } catch (error) {
        console.error("Error in deleteItem:", error);
        return baseResponse(res, false, 500, "Error deleting item", error);
    }


};
