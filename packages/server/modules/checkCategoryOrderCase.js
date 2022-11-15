module.exports = OrderCase = function (type) {
    let orderCase = "";

    if (type == 0) 
        orderCase += "order by create_dtm desc";
    else if (type == 1) 
        orderCase += "order by purchase_count desc";
    else if (type == 2) 
        orderCase += "order by product_discount_price";
    else if (type == 3) 
        orderCase += "order by product_discount_price desc";
    else if (type == 4) 
        orderCase += "order by is_accumulate desc";
        

    return orderCase;
    
}