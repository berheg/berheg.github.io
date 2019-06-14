console.log('Script loaded');

console.log(getAvailableProducts());
//forming list with the className
function creatListWithClassName(tagName, className, text) {
    const product = document.createElement(tagName);
    product.className = className;
    product.innerHTML = text;
    return product;
};

// creat list inside ul
function creatListsInsideUl(product) {
    const ul = document.createElement("ul");
        ul.appendChild(creatListWithClassName('li', 'name', product.name)); 
        ul.appendChild(creatListWithClassName('li', 'price', product.price));
        ul.appendChild(creatListWithClassName('li', 'rating', product.rating));
        ul.appendChild(creatUlShipping(product.shipsTo));
     return ul ;     
};
// creat a ul for shipTo and creat lists shipsTo
function creatUlShipping(shipsTo) {
    const ul = document.createElement("ul");
        for (const item of shipsTo ){
            ul.appendChild(creatListWithClassName('li', ' ', item));    
        }
    return ul;    
};

// creat list of product object with attributies name, price, rating and shipsTo and renders 
function renderProducts (productList){
    const ul = document.querySelector("section.products > ul");
    for (const product of productList)  {
        const li = document.createElement("li");
        li.appendChild(creatListsInsideUl(product)) ;
        ul.appendChild(li);
    }
};
renderProducts(getAvailableProducts());