const mongoose = require ('mongoose')
const jwt = require ('jsonwebtoken')
const User = require ('../../src/models/user')
const Task = require ('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'lital kushnir',
    email: 'hey@examp.com',
    password: '123456',
    age: 50,
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.jwtSecret)
    }]
}
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'almog ram',
    email: 'hey123@examp.com',
    password: '123456',
    age: 50,
    tokens:[{
        token: jwt.sign({_id: userTwoId}, process.env.jwtSecret)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'taskOne',
    completed: 'false',
    owner: userOneId,
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'taskTwo',
    completed: true,
    owner: userOneId,
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'taskTwo',
    completed: true,
    owner: userTwoId,
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userTwoId,
    userOne,
    userTwo,
    taskOne,
    setupDatabase,
}