module.exports = WhereCase = function (brand) {
    let whereCase = "";

    if (brand) {
        let brands = brand.split(',').map((item) => item.trim());

        whereCase += ` and vender in ('${brands.join("', '")}')`
    }

    return whereCase;
    
}