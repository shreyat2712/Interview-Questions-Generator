const mongoose = require('mongoose');


const db=async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://shreyat2712:8CwHnMB8lmczAybc@cluster0.lp5gtj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Db is connected successfully!');
    } catch (error) {
        console.log('Db not connected ',error);
    }   
}

module.exports=db;