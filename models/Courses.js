const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    instructor_email: { type: String, required: true },
    instructor_name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    photo: { type: String, required: true },
    enrolledUsersCount: { type: Number },
    enrolledUsers: [{
        "email": { type: String, required: true },
        "status": { type: Boolean, required: true }
    }]
})

const Course = mongoose.model("courses", courseSchema);

module.exports = Course;