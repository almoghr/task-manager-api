require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndDelete('5fb504742237ad548c8fffdc').then((task) => {
//     console.log('task' + task + 'has been deleted')
//     return Task.countDocuments({ completed: false }).then((count) => {
//         console.log(count)
//     })
//     }).catch((err) => {
//         console.log(err)
// })

const deleteAgeAndCountDocuments = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})
    return{
        task,
        count
    }
}

deleteAgeAndCountDocuments('5fb6ed97cb60c85164b766c4').then(({task, count}) => {
    console.log(task, count)
}).catch(err => console.log(err))
// 5fb6ed97cb60c85164b766c4