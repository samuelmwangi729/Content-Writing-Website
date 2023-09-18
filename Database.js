const mongoose = require('mongoose')

//create a connection object 
const connDb = async ()=>{
    //use the try catch block
    try{
        const dbURL = "mongodb+srv://writerssuperadmin:EhyZRGkz4QD60J9Z@writerscluster.brh8p66.mongodb.net/WritersCluster?retryWrites=true&w=majority"
        await mongoose.connect(dbURL)
        .then(response=>{
            console.log('Successfully connected to the Database')
        })
    }catch(e){
        console.log('could not connect to the database')
    }
}
module.exports=connDb
//EhyZRGkz4QD60J9Z
