const request = require('supertest')
const jwt = require ('jsonwebtoken')
const mongoose = require ('mongoose')
const app = require('../src/app')
const User = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'hey',
    email: 'hey@examp.com',
    password: '123456',
    age: 50,
    tokens:[{
        token: jwt.sign({_id: userOneId}, process.env.jwtSecret)
    }]
}
beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('should sign up a new user', async () => {
    await (await request(app).post('/users').send({
        name: 'guy brown',
        email: 'almodsjakl@example.com',
        password: '123456',
        age: 51
    }).expect(201)
    ) 
})
test('should not sign up a new user because of bad credentials', async () => {
    await (await request(app).post('/users').send({
        name: 'guy brown',
        email: 'almodsjakl@example.com',
        password: '123456',
        age: 2
    }).expect(400)
    ) 
})

test('should login existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})
test('should not login nonexisting user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: '111111111'
    }).expect(400)
})

test('should get profile for authenticated user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})
test('should delete account for an authenticated user', async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})
test('should not delete account for an unauthenticated user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})
