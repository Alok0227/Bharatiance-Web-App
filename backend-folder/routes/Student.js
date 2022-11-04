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
const Attendance = require("../models/Attendance");

const auth = require('../middleware/auth');

router.post(
    "/register",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Please enter a password").isLength({ min: 1, }),
        check("roll", "Please enter roll").isLength({ min: 1, }),
        check("dept", "Please enter department").isLength({ min: 1, }),
        check("year", "Please enter year").isLength({ min: 1, }),
    ],
    async (req, res) => {
        const { email, password, name, roll, dept, year } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        //check if email already exists. if it does, do not register
        try {
            let student = await Student.findOne({
                 email: req.body.email,
            });

            if (student) {
                return res.status(400).json({ errors: [{ msg: "User already exists" }] });
            }

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;

                    Student.create({
                        email: email,
                        password: hash,
                        name: name,
                        roll: roll,
                        dept: dept,
                        year: year,
                    })
                        .then((newStudent) => {
                            const payload = {
                                email: email,
                                name: name,
                                roll: roll,
                                dept: dept,
                                year: year,
                            };

                            jwt.sign(
                                payload,
                                keys.secretOrKey,
                                {
                                    expiresIn: 360000,
                                },
                                (err, token) => {
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

router.post(
    "/login",
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
            let student = await Student.findOne({
                 email: req.body.email 
            });

            if (!student) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User does not exist" }] });
            }

            const isMatch = await bcrypt.compare(password, student.password);

            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: "Invalid login" }] });
            }

            const payload = {
                email: email,
                name: student.name,
                roll: student.roll,
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
        const profile = await Student.findOne({
             email: req.user.email
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

router.get("/courses", auth, async (req, res) => {
    console.log(req.user);
    try {
        const profile = await Student.findOne({
             email: req.user.email
        });

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }

        Course.find({
            
                year: profile.year,
                dept: profile.dept,
           
        })
            .then((courses) => res.json(courses))
            .catch((err) =>
                res.status(404).json({ nopostfound: "No post found with that ID" })
            );
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

router.get("/courses/:course", auth, async (req, res) => {
    try {
        const profile = await Student.findOne({
             email: req.user.email 
        });

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }

        Course.find({
            
                year: profile.year,
                course: req.params.course,
            
        })
            .then((courses) => res.json(courses))
            .catch((err) =>
                res.status(404).json({ nopostfound: "No post found with that ID" })
            );
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

router.get("/attendance/:course", auth, async (req, res) => {
    try {
        const profile = await Student.findOne({
             email: req.user.email 
        });

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }

        Attendance.findAll({
            
                roll: profile.roll,
                year: profile.year,
                course: req.params.course,
           
        })
            .then((records) => {
                res.json(records);
            })
            .catch((err) => console.log(err.message));
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

router.get("/attendance", auth, async (req, res) => {
    try {
        const profile = await Student.findOne({
             email: req.user.email 
        });

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }

        Attendance.find({
                roll: profile.roll,
                year: profile.year,
        })
            .then((records) => {
                let total = records.length;
                let present = 0;
                records.map((record) => {
                    if (record.status === "Present") present++;
                });
                let avg = (present / total) * 100;
                res.json({
                    present: present,
                    avg: avg,
                });
            })
            .catch((err) => console.log(err.message));
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

router.get("/percent/:course", auth, async (req, res) => {
    try {
        const profile = await Student.findOne({ email: req.user.email });

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }

        Attendance.findAll({
                roll: profile.roll,
                year: profile.year,
                course: req.params.course,
        })
            .then((records) => {
                let total = records.length;
                let present = 0;
                records.map((record) => {
                    if (record.status === "Present") present++;
                });
                res.send({
                    Present: present,
                    Absent: total - present,
                    Percent: (present / total) * 100,
                });
            })
            .catch((err) => console.log(err.message));
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
});

module.exports = router;