const res = require('express/lib/response');
const Product = require('../models/productModel');

exports.getproduct = async(req,res)=>{
    Product.find()
    .exec((err,result)=>{
        res.status(200).json({
            msg:"OK",
            data: result
        });
    });
}

exports.getProductById = async (req, res) => {
    Product.findById(req.params.id)     //find product by id
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.addProduct = async(req , res)=>{
    try {
        let product = new Product({
            product_id:req.body.product_id,
            name:req.body.name,
            author:req.body.author,
            publisher:req.body.publisher,
            price:req.body.price

        });
        //fields password in html hass password first
        // staff.password = await staff.hashPassword(req.body.password);

        let createProduct = await product.save();

        res.status(200).json({
            msg:"Add Product OK",
            data: createProduct
        });



    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            error:error
        });
    }
}

exports.updateProduct = async (req,res)=>{
    let product = {
        name : req.body.name,
        author : req.body.author,
        publisher : req.body.publisher,
        price : req.body.price
    };
    Product.findByIdAndUpdate(req.params.id, product)
        .exec((err, result) => {
            Product.findById(req.params.id)
                .exec((err, result) => {
                    res.status(200).json({
                        msg: "OK",
                        data: result
                    });
                });
        });
};


exports.deleteProduct = async (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .exec((err) => {
            if (err) {
                res.status(500).json({
                    msg: err
                });
            } else {
                res.status(200).json({
                    msg: "Delete complete"
                });
            }
        });
};