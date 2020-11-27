const mongoose = require('mongoose')
mongoose.connect(process.env.mongoDB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})



