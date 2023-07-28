const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://admin:admin$7@cluster0.zyzps3s.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;