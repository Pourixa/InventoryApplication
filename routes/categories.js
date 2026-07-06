const {Router} = require("express");
const DB = require("../db/queries")
const categories = Router();

categories.get("/" ,async (req,res) => {
    const rows = await DB.getCategories();
    res.render("categories",{categories:rows})
})

module.exports = categories