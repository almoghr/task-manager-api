require('../src/db/mongoose')

const User = require('../src/models/user')


// User.findByIdAndUpdate('5fb50145cb51685f103242a2', {
//     age: 25 
// }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 21}).then((count) => {
//         console.log(count)
//     })
//     }).catch((err) => {
//         console.log(err)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5fb50145cb51685f103242a2', 28).then((count) => {
    console.log(count)
}).catch((err) => {
    console.log(err)
})