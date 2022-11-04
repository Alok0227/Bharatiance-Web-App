// This is user model in mongoose model: We're defining the user's credentials to validate the information 
const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
    email: {
        type: String,
        allowNull: false,
        unique: true,
    },
    roll: {
        type: String,
        allowNull: false,
        unique: true,
    },
    name: {
        type: String,
        allowNull: false,
    },
    password: {
        type: String,
        allowNull: false,
    },
    dept: {
        type: String,
        allowNull: false,
    },
    year: {
        type: String,
        allowNull: false,
    },

});
const Student = mongoose.model('Student', StudentSchema)
module.exports = Student;