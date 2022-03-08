const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');


router.get("/",productController.getproduct);
router.get("/:id",productController.getProductById)
router.post("/add" ,productController.addProduct);
router.put("/:id",productController.updateProduct);

router.delete("/:id",productController.deleteProduct);


module.exports= router;