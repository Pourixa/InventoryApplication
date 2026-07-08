const { Router } = require("express");
const DB = require("../db/queries")
const addItem = Router();

addItem.get("/",(req,res) => {
    res.render("addItem")
})

module.exports = addItem