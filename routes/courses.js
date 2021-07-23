const { Router } = require('express');
const courseController = require('../controllers/courseController')

const router = new Router();

//Fetch All Courses
router.get('', courseController.fetchAllCourses);

//router.get('/id', courseController.fetchCourseById);

//Create Course Router
router.post('/create', courseController.createCourse);
router.post('/entroll', courseController.entrollCourse);
//Fetch perticular instructor created courses
router.post('/instructor', courseController.fetchInstructorCourses);
//Fetch enrolled courses for perticular student
router.post("/student/entroll/courses", courseController.fetchStudentCourses);

module.exports = router;