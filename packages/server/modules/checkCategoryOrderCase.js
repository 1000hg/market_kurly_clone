module.exports = OrderCase = function (type) {
    let orderCase = "";

    if (type == 0) 
        orderCase += "order by tb1.create_dtm desc";    //신상품순
    else if (type == 1) 
        orderCase += "order by purchase_count*1 desc";    //판매량순
    else if (type == 2) 
        orderCase += "order by product_discount_price*1"; //낮은 가격순
    else if (type == 3) 
        orderCase += "order by product_discount_price*1 desc";    //높은 가격순
    else if (type == 4) 
        orderCase += "order by discount_price*1 desc"; //혜택(할인)순
    else if (type == 5) 
        orderCase += "order by tb1.recommend_count*1 desc";   // 추천순
        

    return orderCase;
    
}