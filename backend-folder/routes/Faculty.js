const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const keys = {
    secretOrKey: "secret",
};

const Faculty = require("../models/Faculty");
const Course = require("../models/Courses");
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const Attendance = require("../models/Attendance");


router.post(
    "/register",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Please enter a password").isLength({ min: 1, }),
        check("dept", "Please enter department").isLength({ min: 1, }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { email, password, name, dept } = req.body;

        try {
            let faculty = await Faculty.findOne({
                email: req.body.email
            });

            if (faculty) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;

                    Faculty.create({
                        email: email,
                        password: hash,
                        name: name,
                        dept: dept,
                    })
                        .then((newFaculty) => {
                            const payload = {
                                email: email,
                                name: name,
                                dept: dept,
                            };

                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                {
                                    expiresIn: 360000,
                                },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        success: true,
                                        token: token,
                                    });
                                }
                            );
                        })
                        .catch((err) => {
                            console.log(err.message);
                            res.status(500).send("Status Error");
                        });
                });
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    }
);

router.post("/login",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let faculty = await Faculty.findOne({
                email: req.body.email,
            });

            if (!faculty) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User does not exist" }] });
            }

            const isMatch = await bcrypt.compare(password, faculty.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid login" }] });
            }

            const payload = {
                email: email,
                name: faculty.name,
                dept: faculty.dept,
            };

            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({
                        success: true,
                        token: token,
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server error");
        }
    }
);

router.get("/current", auth, async (req, res) => {
    try {
        const profile = await Faculty.findOne({
                email: req.user.email,
        });

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }

        res.json(profile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

router.post("/courses", auth, (req, res) => {
    const { course, year } = req.body;

    Course.create({
        dept: req.user.dept,
        faculty: req.user.name,
        course:req.body.course,
        year:req.body.year
    })
        .then((course) => {
            try {
                res.send(course);
            } catch (err) {
                res.status(500).send(err);
            }
        })
        .catch((err) => console.log(err.message));
});

router.get("/courses", auth, (req, res) => {
    Course.find({
        faculty: req.user.name,
    })
        .then((courses) => res.json(courses))
        .catch((err) =>
            res.status(404).json({
                nopostfound: "No post found with that ID",
            })
        );
});

router.get("/students/:year", auth, (req, res) => {
    Student.find({
            year: req.params.year,
            dept: req.user.dept,
        order: [["roll", "ASC"]],
    })
        .then((students) => res.json(students))
        .catch((err) =>
            res.status(404).json({
                nopostfound: "No post found with that ID",
            })
        );
});

router.post("/attendance/:year/:roll/:course", auth, (req, res) => {
    Student.find({
        roll: req.params.roll,
    })
        .then((student) => {
            const { date, status } = req.body;

            Course.findOne({
                    faculty: req.user.name,
                    year: req.params.year,
                    dept: req.user.dept,
                    course: req.params.course,
            }).then((course) => {
                Attendance.create({
                    roll: req.params.roll,
                    course: req.params.course,
                    year: req.params.year,
                    name: student.name,
                    date: date,
                    status: status,
                })
                    .then((record) => res.json(record))
                    .catch((err) => console.log(err.message));
            });
        })
        .catch((err) =>
            res.status(404).json({ nopostfound: "No post found with that ID", }));
});

// @route   GET api/faculty/attendance/:year/:roll
// @desc    Get attendance of a student
// @access  Private


router.get("/attendance/:year/:roll/:course", auth, (req, res) => {
// 
    Attendance.find({
        roll: req.params.roll,
        year: req.params.year,
        course: req.params.course,
    })
        .then((records) => res.json(records))
        .catch((err) => console.log(err.message));
});

router.put("/attendance/:year/:roll/:course/:date", auth, (req, res) => {
    const { status } = req.body;

    Course.findOne({
            faculty: req.user.name,
            year: req.params.year,
            dept: req.user.dept,
            course: req.params.course
            
    }).then((course) => {
        Attendance.findOne({
                roll: req.params.roll,
                year: req.params.year,
                course: course.course,
                date: req.params.date,
        })
            .then((record) => {
                record.status = status;
                record.save();
                res.json(record);
            })
            .catch((err) => console.log(err.message));
    });
});
module.exports = router;

