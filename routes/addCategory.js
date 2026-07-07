const { Router } = require("express");
const DB = require("../db/queries")
const addCategory = Router();

addCategory.get("/" , (req,res) =>{
    res.render("addCategory")
})

addCategory.post("/", (req,res) => {
    DB.addCategory(req.body)
    res.redirect("/categories")
})

module.exports = addCategory