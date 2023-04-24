const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://manjeet:manjeet.kmr90@cluster0.upechy1.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.on("connected", function () {
    console.log("Application is connected to Databse");
})