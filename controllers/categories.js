const {Router} = require("express");
const categories = Router();

categories.get("/" ,(req,res) => {
    res.render("categories")
})

module.exports = categories