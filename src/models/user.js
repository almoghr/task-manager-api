const mongoose = require ('mongoose')
const validator = require ('validator')
const bcryptjs = require('bcryptjs')
const jwt = require ('jsonwebtoken')
const Task = require ('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
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
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]     
}, 
    {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'},
})
userSchema.virtual('tasks', {
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'
})

//hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password, 8)
    }
    next()
})

userSchema.pre('remove', async function (next){
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign( {_id: user._id.toString() }, 'thisismynewcourse')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens

    return userObject
}
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {throw new Error("unable to log in")}
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {throw new Error("unable to login")}

    return user
}


const User = mongoose.model('User', userSchema) 


module.exports = User   