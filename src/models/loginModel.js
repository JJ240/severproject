const mongoose =  require('mongoose');
const uniqueValidator =  require('mongoose-unique-validator');
const bcrypt =  require('bcrypt');
const jwt =  require('jsonwebtoken');


const Schema = mongoose.Schema;

const loginSchema = new Schema({

    loginId:{
        type:String,
        required : true,
        unique:true,
    },
    name:{
        type:String,
        required : true,
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    tel:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
loginSchema.methods.hashPassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
}
loginSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}
loginSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
}
module.exports = mongoose.model("Login", loginSchema);
loginSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});

