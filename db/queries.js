
const categories = require("../controllers/categories.js");
const DB = require("../pool.js");

async function getCategories()
{
    const {rows} = await DB.query("SELECT * FROM categories");
    return rows
};

async function getItems(category) {
    let {rows} = await DB.query("SELECT COUNT(*) AS totalitems , SUM(price) AS totalprice FROM items;");
    let data = {totalItems : rows[0].totalitems , totalPrice:rows[0].totalprice};
    ({rows} = await DB.query("SELECT * FROM categories"));
    data.categories= rows;
    if(category)
    {
        ({rows} = await DB.query("SELECT id FROM categories WHERE name = $1;",[category]));
        const categoryID = rows[0].id;;
        ({rows} = await DB.query("SELECT * FROM items WHERE categoryID = $1;",[categoryID]));
        const items = rows;
        ({rows} = await DB.query("SELECT COUNT(*) AS totalitemscategory , SUM(price) AS totalpricecategory FROM items WHERE categoryID = $1",[categoryID]));
         data.totalItemsCategory = rows[0].totalitemscategory ;
         data.totalPriceCategory = rows[0].totalpricecategory;
         data.categoryID = categoryID;
        return [items,data];

    }
    else
    {
        const {rows} = await DB.query("SELECT * FROM items");
        return [rows,data];

    }
    

}

module.exports = {
    getCategories,
    getItems
}