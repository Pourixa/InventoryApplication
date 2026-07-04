
const DB = require("../pool.js");

async function getCategories()
{
    const {rows} = await DB.query("SELECT * FROM categories");
    return rows
}

module.exports = {
    getCategories,
}