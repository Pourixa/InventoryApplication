const {Router} = require("express");
const DB = require("../pool.js");

const categories = Router();

categories.get("/" ,async (req,res) => {
    const {rows} = await DB.query("SELECT * FROM categories");
    res.render("categories",{categories:rows})
})

module.exports = categories