const mongoose = require('mongoose');
const { Schema } = mongoose;

const FacultySchema = new Schema({
    email: {
        type: String,
        allowNull: false,
        unique: true,
    },
    password: {
        type: String,
        allowNull: false,
    },
    name: {
        type: String,
        allowNull: false,
    },
    dept: {
        type: String,
        allowNull: false,
    },
});

const Faculty = mongoose.model('Faculty', FacultySchema)
module.exports = Faculty;
