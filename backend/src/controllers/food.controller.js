const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');

async function createFood(req, res) {

    console.log(req.foodPartner);

    console.log(req.body);

    console.log(req.file);

    const fileUploadResult = await storageService.uploadFile(
        req.file.buffer, 
        req.file.originalname
    );

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id,
    });

    res.status(201).json({
        message: 'Food item created successfully',
        foodItem: foodItem,
    });

}

async function getAllFoodItems(req, res) {

    const foodItems = await foodModel.find({})
    res.status(200).json({ 
        message: 'Food items retrieved successfully',
        foodItems: foodItems
     });
}

module.exports = {
    createFood,
    getAllFoodItems 
}