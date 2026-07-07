const {Router} = require("express");
const DB = require("../db/queries")
const editItem = Router();

editItem.get("/:itemID",async (req,res) =>
{
    const item = await DB.getOneItem(req.params.itemID);
    res.render("editItem",{item:item})
})

module.exports = editItem