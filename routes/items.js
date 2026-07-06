const {Router} = require("express");
const DB = require("../db/queries")
const items = Router();

items.get("/" ,async (req,res) => {
    const cat = req.query.category;
    const [rows,data] = await DB.getItems(cat ? cat : false);
    res.render("items",{items:rows,data:data})
})

module.exports = items