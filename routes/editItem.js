const {Router} = require("express");
const DB = require("../db/queries")
const editItem = Router();

editItem.get("/:itemID",async (req,res) =>
{
    const item = await DB.getOneItem(req.params.itemID);
    res.render("editItem",{item:item,error:""})
})

editItem.post("/:itemID" , async (req,res) => {
const item = await DB.getOneItem(req.params.itemID)
if(item.password == req.body.password)
{    DB.updateItem(req.params.itemID,req.body)
    res.redirect("/item/"+req.params.itemID)
}else
{
    res.render("editItem",{item:item , error:"The password is not correct!" })
}
})

editItem.post("/:itemID/delete" , async (req,res) => {
const item = await DB.getOneItem(req.params.itemID)
if(item.password == req.body.password)
{
    await DB.deleteItem(req.params.itemID)
    res.redirect("/items")
}
else{
    res.render("editItem",{item:item , error:"The password is not correct!" })
}
})

module.exports = editItem