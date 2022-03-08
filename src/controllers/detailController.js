const Detail = require("../models/detailModel");

exports.detailProduct = async(req, res) => {
    try {
        let detail = new Detail(req.body);
        // detail.dueDate = new Date().setDate(new Date() + 7);
        let createdDetail = await detail.save();

        //กำหนด data ของ dueDate แล้วค่อยเอาไป update หลังจากที่ insert แล้ว
        let dDate = new Date(createdDetail.detailDate)
        let data = { 
            //เพิ่มวันตามประเภทสมาชิก เปลี่ยน 120 เป็น login.dayCandetail
            dueDate : dDate.setDate(dDate.getDate()+120)    
        };
        //update โดยใส่ฟิลด์ dueDate แล้วให้ return เป็นผลลัพธ์
        Detail.findByIdAndUpdate(createdDetail._id, data).exec((err, result)=>{
            Detail.findById(createdDetail._id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "detail OK",
                        data: result
                    });
                });
        });
    } catch (error) {
        // if there is an error, it will jump to here
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.getDetail = async (req, res) => {
    Detail.find()
        .exec((err, result) => {
            res.status(200).json({
                msg: "Ok",
                data: result
            })
        });
};
// คืนหนังสือ = แก้ไข detail โดยเพิ่มฟิลด์ returnedDate โดยเก็บวัน/เวลาปัจจุบัน
exports.returnProduct = async(req, res) => {
    let data = { 
        returnedDate : new Date(),
        receiver: req.body.receiver
    };
    Detail.findByIdAndUpdate(req.params.id, data).exec((err, result)=>{
            Detail.findById(req.params.id)
                .exec((err, result)=>{
                    res.status(200).json({
                        msg: "Return product saved",
                        data: result
                    });
                });
        });
};

exports.getDetailDataLogin = async (req, res) => {
    let login_id = req.params.id;
    console.log(login_id);
    Detail.find({ "detail.login_id": login_id })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
};

exports.getDetailDataProduct = async (req, res) => {
    let product_id = req.params.id;
    console.log(product_id);
    Detail.find({ "product.product_id": product_id })
        .exec((err, result) => {
            res.status(200).json({
                msg: "OK",
                data: result
            });
        });
}; 

exports.addDetail = async (req, res) => {
    try {
        // define a new product schema, define data from request body
        let detail = new detail({
            detail: req.body.detail,
            product: req.body.product,
            datedetail: req.body.datedetail,
            limit: req.body.limit,
            lender: req.body.lender,
            // student: req.body.student,
            // teacher:req.body.teacher
            // no reviews yet for now
        });
        // store result from saving
        let createdDetail = await detail.save();
        res.status(200).json({
            msg: "Add a Product complete.",
            data: createdDetail
        });
    } catch (err) {
        // if there is an error, it will jump to here
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};