const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requirement: true
    },
    email:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    }

},{ timestamp: true
})

const userModel = mongoose.model('users',userSchema);

module.exports = userModel;