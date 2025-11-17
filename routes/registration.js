const router = require("express").Router()
const register = require("../controller/auth/registration.js")
const login  = require("../controller/auth/login.js")

router.post("/register",register)

router.post("/login",login)


module.exports = router