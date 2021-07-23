const Course = require('../models/Courses');

//Create course
exports.createCourse = (req, res) => {
    const { name, description, duration, photo, instructor_email, instructor_name } = req.body;

    const newCourse = new Course();

    newCourse.name = name;
    newCourse.instructor_email = instructor_email;
    newCourse.instructor_name = instructor_name;
    newCourse.description = description;
    newCourse.duration = duration;
    newCourse.photo = photo;
    newCourse.save().then(result => {
        res.status(201).send({ message: "New course created successfully" });
    })
    .catch(err => {
        res.send("Error occured in course creation");
    })
}

//Fetch all courses controller
exports.fetchAllCourses = (req, res) => {
    Course.find().then(listCourses => {
        res.status(200).send(listCourses);
    })
}

//Fetch Instructor created courses
exports.fetchInstructorCourses =(req, res)=> {
    const { email } = req.body;
    Course.find({instructor_email: email }).then(instructorCourses => {
        res.status(200).send(instructorCourses);
    })
    .catch(err => {
        res.send("Somthing error occured")
    })
}

//Entroll the course by student
exports.entrollCourse = (req, res) => {
    const { id, email, status } = req.body;
    Course.findOne({ _id: id}).then((data) => {
    Course.updateOne({ _id: id }, {enrolledUsersCount: data.enrolledUsers.length+1, $push: {enrolledUsers: { "email": email, "status": status }} })
                    .then(() => {
                        res.status(201).send({message: "Course entrolled successfully"});
                    }).catch(err => {
                        res.send("Error occured in course entroll process update");
                    });
                }).catch(err => {
                    res.send("Error occured in course entroll process update!");
                })
}

//Fetch enrolled courses for perticular student
exports.fetchStudentCourses = (req, res) => {
    const { email } = req.body;
    Course.find({ enrolledUsers: { $elemMatch: { email: email} } }).then(data => {
        courseDetails = [];
        for(const key in data) {
            courseDetails.push({
                "id": data[key]._id,
                "courseName": data[key].name,
                "duration": data[key].duration,
                "photo": data[key].photo,
                "description": data[key].description,
                "status": true
            })
        }
        res.status(200).send(courseDetails);
    })
    .catch(err => {
        res.send("Error", err);
    })
}