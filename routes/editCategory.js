const {Router} = require("express");
const DB = require("../db/queries")
const editCat = Router();

editCat.get("/:category" , async (req,res) =>
{
    const cat = await DB.getOneCategory(req.params.category);
    res.render("editCategory",{cat:cat})
})

editCat.post("/:category" , async (req,res) =>
{
    const cat = await DB.updateCategory(req.params.category,{name:req.body.name,description:req.body.description});

    res.redirect("/categories")
})

editCat.post("/:category/delete",async (req,res) =>{
    await DB.deleteCategory(req.params.category).then(() => res.redirect("/categories")).catch((err) => {res.send("<script>window.location.replace('/categories');alert('THERE WAS AN ERROR DELETING THE CATEGORY! MAKE SURE THE CATEGORY IS EMPTY FIRST!')</script>")});
})


module.exports = editCat