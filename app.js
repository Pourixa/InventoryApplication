const EXPRESS = require("express")
const APP = EXPRESS();
const categories = require("./controllers/categories")
const PORT = 8585;

APP.locals.darkMode= true;
APP.set("views","./views")
APP.set("view engine" , "ejs");
APP.use(EXPRESS.static("./public"))

APP.get("/",(req,res) => {
    res.render("homepage")
})

APP.use("/categories",categories)


APP.listen(PORT,(err) => {
    if(err)
        throw err;
    console.log("running on port" , PORT)
})