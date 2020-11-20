const mongoose = require ('mongoose')
const validator = require ('validator')


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
           if(value.length < 6){
               throw new Error('Password is too short');
           } else if(value.toLowerCase().includes('password')){
               throw new Error('Password must not contain the word password')
           }
        }
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 18 && value > 0) {
                throw new Error('you are to young to assign to this app')
            } else if (value < 0) {
                throw new Error('age must be positive number')
            }
        }
    },
    created: {
        type: Date,
        default: Date.now()
    },      
});


module.exports = User