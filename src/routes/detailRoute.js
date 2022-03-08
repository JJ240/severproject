const express = require('express');
const app = express.Router();
const detailController = require("../controllers/detailController");


app.get("/login/:id", detailController.getDetailDataLogin);
app.get("/product/:id", detailController.getDetailDataProduct);
app.get("/", detailController.getDetail);
app.post("/", detailController.detailProduct);

module.exports = app;