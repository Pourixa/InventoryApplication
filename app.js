const EXPRESS = require("express")
const categoriesRoute = require("./routes/categories")
const itemsRoute = require("./routes/items")
const editCatRoute = require("./routes/editCategory")
const addCategoryRoute = require("./routes/addCategory")
const editItemRoute = require("./routes/editItem")
const addItem = require("./routes/addItem")
const APP = EXPRESS();
const PORT = 8585;

APP.set("views","./views")
APP.set("view engine" , "ejs");
APP.use(EXPRESS.static("./public"))
APP.use(EXPRESS.urlencoded({ extended: true }));

APP.get("/",(req,res) => {
    res.render("homepage")
})

APP.use("/categories",categoriesRoute)
APP.use("/items",itemsRoute)
APP.use("/editCategory" , editCatRoute)
// APP.use("/addCategory",addCategoryRoute)
APP.use("/item" ,editItemRoute )
APP.use("/addItem",addItem)

APP.use((req,res) => {
    res.status(404).send("PAGE NOT FOUND!")
})
APP.listen(PORT,(err) => {
    if(err)
        throw err;
    console.log("running on port" , PORT)
})