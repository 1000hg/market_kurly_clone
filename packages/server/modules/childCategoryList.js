const db = require('../db');


let category_query = [];

async function repeatCategoryList(category_seq) {
    let [parent] = await db.query(`select * from tb_category as tb1 where tb1.parent_id = ${category_seq}`)

    if (parent.length == 0)
        return;

    parent.forEach(element => {
        category_query.push(element.category_seq);
        repeatCategoryList(element.category_seq);
    })
}

module.exports = repeatList = async function(category_seq) {
    category_query = [];
    await repeatCategoryList(category_seq);
    return category_query.join(",")
}