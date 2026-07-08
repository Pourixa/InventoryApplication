const { Router } = require("express");
const DB = require("../db/queries")
const addItem = Router();

addItem.get("/",(req,res) => {
    res.render("addItem")
})

addItem.post("/" , async (req,res) => {
    const id =await DB.addItem(req.body)
    res.redirect("/item/"+id)
})

module.exports = addItem