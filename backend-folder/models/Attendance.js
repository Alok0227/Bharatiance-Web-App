const mongoose = require('mongoose');
const { Schema } = mongoose;
const moment = require('moment');

const AttendanceSchema = new Schema({
    roll: {
        type: String,
        allowNull: false,
    },

    course: {
        type: String,
        allowNull: false,
    },
    year: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        allowNull: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
    },

});

const Attendance = mongoose.model('Attendance', AttendanceSchema)
module.exports = Attendance;