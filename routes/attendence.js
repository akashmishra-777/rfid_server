const router = require("express").Router()
const mark_attendence = require("../controller/attendence/markAttendence")
const {fetch_total_attendence,fetch_attendence_with_date,fetch_attendence_with_month_year} = require("../controller/attendence/fetchAttendence.js")

router.post("/mark_attendence",mark_attendence)
router.post("/get_total_attendence",fetch_total_attendence)
router.post("/get_attendence_by_date",fetch_attendence_with_date)
router.post("/get_attendence_month_year",fetch_attendence_with_month_year)

module.exports  = router