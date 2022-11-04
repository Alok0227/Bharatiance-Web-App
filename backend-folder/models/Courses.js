const mongoose = require('mongoose');
const { Schema } = mongoose;


const CoursesSchema = new Schema({
    
    dept: {
        type: String,
        allowNull: false,
    },
    faculty: {
        type: String,
        allowNull: false,
    },
    course: {
        type: String,
        allowNull: false,
    },
    year: {
        type: String,
        allowNull: false,
    },
    archived: {
        type: String,
        defaultValue: false,
        allowNull: false,
    },

});




const Courses = mongoose.model('Courses', CoursesSchema)
module.exports = Courses;