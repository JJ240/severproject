const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const auth = require('../middleware/auth');


router.get("/",loginController.getLogin);

router.post("/add" ,loginController.addlogin);
router.post("/login",loginController.login);
router.put("/:id",loginController.updateLogin);

router.delete("/:id",loginController.deleteLogin);


module.exports= router;