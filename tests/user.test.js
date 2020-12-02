const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require ('./fixtures/db')

beforeEach(setupDatabase)

test('should sign up a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'guy brown',
        email: 'almodsjakl@example.com',
        password: '123456',
        age: 51
    }).expect(201)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body.user.name).toBe('guy brown')
    expect(response.body).toMatchObject({
        user:{
            name: 'guy brown',
            email: 'almodsjakl@example.com',
            age: 51
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('123456')
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
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)

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
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})
test('should not delete account for an unauthenticated user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ name: "almog ram" })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual("almog ram")
})
test('should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ namee: "almog ram" })
        .expect(400)
    const user = await User.findById(userOneId)
    expect(user.name).not.toBe("almog ram")
    expect(user.name).toBe("lital kushnir")
})

// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated
