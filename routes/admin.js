const router = require("express").Router()
const {getBranches,branchHandler} = require("../controller/admin/branchHandler.js")
const {get_Sections,sectionHandler} = require("../controller/admin/sectionHandler.js")

router.post("/add_branches",branchHandler)

router.get("/get_branches",getBranches)

router.post("/add_sections",sectionHandler)

router.get("/get_sections",get_Sections)


module.exports = router