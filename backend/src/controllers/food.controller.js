const foodModel = require('../models/food.model');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');
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

async function likeFood(req, res) {
    const {foodId} = req.body;

    const user = req.user;
    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    });
    if(isAlreadyLiked){
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        });

        return res.status(200).json({
            message: 'Food item unliked successfully'
        });
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    });

    res.status(201).json({
        message: 'Food item liked successfully',
        like: like
    });
    

    
}

async function saveFood(req, res) {
    const {foodId} = req.body;

    const user = req.user;
    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    });
    if(isAlreadySaved){
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        });
        return res.status(200).json({
            message: 'Food item unsaved successfully'
        });
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    });

    res.status(201).json({
        message: 'Food item saved successfully',
        save: save
    });
    
}



module.exports = {
    createFood,
    getAllFoodItems,
    likeFood,
    saveFood 
}