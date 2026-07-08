
const categories = require("../routes/categories.js");
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
    ({rows} = await DB.query("SELECT categoryid , SUM(quantity) FROM items JOIN categories ON items.categoryid = categories.id GROUP BY categoryid"))
    data.categoriesStock = rows;
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

async function getOneCategory(id) {
    const cat = await DB.query("SELECT * FROM categories WHERE id = $1" , [id]).then(d=>  {return d.rows[0] })
    return cat;
}

async function addCategory(data) {
    await DB.query("INSERT INTO categories(name , description) VALUES ($1 , $2) " , [data.name , data.description])
}

async function updateCategory(id,data) {
    await DB.query("UPDATE categories SET name = $1 , description = $2 WHERE id = $3" , [data.name , data.description,id])
}

async function deleteCategory(id) {
    await DB.query("DELETE FROM categories WHERE id = $1" , [id])
}

async function getOneItem(id) {
    const item = await DB.query("SELECT * FROM items WHERE id = $1" , [id]).then(i => {return i.rows[0]})
    return item;
}

async function updateItem(id,data) {
    await DB.query("UPDATE items SET name = $1 , description = $2 , price = $3 , quantity = $4 , imageurl = $5 , categoryid = $6 WHERE id = $7" ,[data.name , data.description , data.price , data.stock , data.imageURL ,data.category,id])
}

async function deleteItem(id) {
    await DB.query("DELETE FROM items WHERE id = $1" ,[id])
}

module.exports = {
    getCategories,
    getItems,
    updateCategory,
    getOneCategory,
    deleteCategory,
    addCategory,
    getOneItem,
    updateItem,
    deleteItem
}