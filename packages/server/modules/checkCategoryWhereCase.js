module.exports = WhereCase = function (brand) {
    let whereCase = "";

    if (brand) 
        whereCase += "and vender = '" + brand + "'";

    return whereCase;
    
}