const { MongoClient, ObjectId, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-app'


MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log('unable to connect to mongodb database')
    } 
    const db = client.db(databaseName)
});