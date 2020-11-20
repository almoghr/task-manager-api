const mongoose = require ('mongoose')

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    },      
});

module.exports = Task