"use strict";
fetch('https://fakestoreapi.com/products')
    .then(function (res) { return res.json(); })
    .then(function (json) { return console.log(json); });
//# sourceMappingURL=getGoods.js.map