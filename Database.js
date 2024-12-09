const mongoose = require('mongoose')

//create a connection object 
const connDb = async ()=>{
    //use the try catch block
    try{
        const dbURL = ""
        await mongoose.connect(dbURL)
        .then(response=>{
            console.log('Successfully connected to the Database')
        })
    }catch(e){
        console.log('could not connect to the database')
    }
}
module.exports=connDb
