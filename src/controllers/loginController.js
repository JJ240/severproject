const login = require('../models/loginModel');

exports.getLogin = async(req,res)=>{
    login.find()
    .exec((err,result)=>{
        res.status(200).json({
            msg:"OK",
            data: result
        });
    });
}

exports.addlogin = async(req , res)=>{
    try {
        let login = new login({
            loginId:req.body.loginId,
            name:req.body.name,
            password:req.body.password,
            address:req.body.address,
            tel:req.body.tel

        });
        login.password = await login.hashPassword(req.body.password);

        let createLogin = await login.save();

        res.status(200).json({
            msg:"Add login OK",
            data: createLogin
        });



    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            error:error
        });
    }
}

exports.login = async (req,res) => {
    const login = {
        loginId: req.body.loginId,
        password: req.body.password
    }
    // console.log(login)
    try {
        let login = await login.findOne({
            loginId: login.loginId
        });
        // console.log(user);
        //check if user exit
        if (!login) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }

        let match = await login.compareUserPassword(login.password, login.password);
        if (match) {
            let token = await login.generateJwtToken({
                login
            }, "secret", {
                expiresIn: 604800
            })

            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: login
                })
            }
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}


exports.updateLogin = async (req,res)=>{
    // req.params.id = id ของ login 
    // req.body = ข้อมูล login ที่จะ update
    let login = {
        name: req.body.name,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    };
    login.findByIdAndUpdate(req.params.id,login)
    .exec((err,data)=>{
        // findById อีกรอบเพื่อเอา data ใหม่
        login.findById(req.params.id)
        .exec((err,data)=>{
            data.password=null;
            res.status(200).json({
                msg: "OK",
                data: data
            });
        });
    });
};


exports.deleteLogin = async (req, res) => {
    login.findByIdAndDelete(req.params.id)
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