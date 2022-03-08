const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-Validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
    detailer: {
        login_id: String,
        name: String
    },
    product: {
        product_id: String,
        name: String,
        author: String
    }
}, 
{ timestamps: true 

});
detailSchema.methods.hashPassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
}
detailSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}
detailSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
}
module.exports = mongoose.model("detail", detailSchema);
detailSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});
