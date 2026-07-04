const {Pool} = require("pg")
const dotenv = require("dotenv")
dotenv.config()
module.exports = new Pool(
    {connectionString: `postgresql://${process.env.ROLE_NAME}:${process.env.ROLE_PASSWORD}@${process.env.HOST}`}
)
