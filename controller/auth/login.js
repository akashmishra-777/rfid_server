const STUDENT = require("../../modals/students.js");
const TEACHER = require("../../modals/teachersRegistration.js");
const bcrypt = require("bcrypt");

async function Login(req, res) {
    const { email, password } = req.body;

    if (!email) {
        return res.json({
            msg: "Email not received on the server.",
            success: false
        });
    }

    if (!password) {
        return res.json({
            msg: "Password not received on the server.",
            success: false
        });
    }

    try {
        // Find user from student or teacher collection
        const checkFromStudent = await STUDENT.findOne({ email: email });
        const checkFromTeacher = await TEACHER.findOne({ email: email });

        const user = checkFromStudent || checkFromTeacher;

        if (!user) {
            return res.json({
                msg: "Account doesn't exist.",
                success: false
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.json({
                msg: "Incorrect password.",
                success: false
            });
        }

        // LOGIN SUCCESS
        return res.json({
            msg: "Login successful",
            success: true,
            data: {
                id:user._id,
                idx:user.idx,
                name: user.name,
                role: checkFromTeacher ? "teacher" : "student"
            }
        });

    } catch (error) {
        return res.json({
            msg: "Server error",
            error: error.message,
            success: false
        });
    }
}

module.exports = Login
