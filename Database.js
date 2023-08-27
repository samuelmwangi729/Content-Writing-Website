const mongoose = require('mongoose')

//create a connection object 
const connDb = async ()=>{
    //use the try catch block
    try{
        await mongoose.connect("mongodb+srv://writerssuperadmin:EhyZRGkz4QD60J9Z@writerscluster.brh8p66.mongodb.net/WritersCluster?retryWrites=true&w=majority")
        .then(response=>{
            console.log('connection successful')
        })
    }catch(e){
        console.log('could not connect to the database')
    }
}
module.exports=connDb
//EhyZRGkz4QD60J9Z
