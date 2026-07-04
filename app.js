const EXPRESS = require("express")
const APP = EXPRESS();
const PORT = 8585;

APP.set("views","./views")
APP.set("view engine" , "ejs");
APP.use(EXPRESS.static("./public"))

APP.get("/",(req,res) => {
    res.render("homepage")
})




APP.listen(PORT,(err) => {
    if(err)
        throw err;
    console.log("running on port" , PORT)
})