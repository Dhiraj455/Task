const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        default: 0
    },
    about:{
        type: String,
        default: ""
    }
})

const countSchema = new mongoose.Schema({
    ip:{
        type:String
    }
    },
    {
    timestamps:true
})
const visitSchema = new mongoose.Schema({
    count:{
        type:Number,
        required:true
    }
})
const User = mongoose.model('User',userSchema);
const Count = mongoose.model('Count',countSchema);
const Visit = mongoose.model('Visit',visitSchema);
// mongoose.model('User',userSchema);
module.exports = Count;
module.exports = User;
module.exports = Visit;