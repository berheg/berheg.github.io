console.log('Script loaded');
//const products = getAvailableProducts();
const availableProducts = getAvailableProducts();  
const input = document.querySelector('input');
const selectCountry = document.querySelector(".country > select");
const selectSort = document.querySelector("div.sort select ");
//forming element with the className
function creatElementWithClassName(tagName, className, text) {
    const element = document.createElement(tagName);
    element.className = className;
    element.innerHTML = text;
    return element;
};
// creat list inside ul
function creatListsInsideUl(product) {
    const ul = document.createElement("ul");
        ul.appendChild(creatElementWithClassName('li', 'name', product.name)); 
        ul.appendChild(creatElementWithClassName('li', 'price', product.price));
        ul.appendChild(creatElementWithClassName('li', 'rating', product.rating));
        ul.appendChild(creatUlShipping(product.shipsTo));
     return ul ;     
};
// creat a ul for shipTo and creat lists shipsTo
function creatUlShipping(shipsTo) {
    const ul = document.createElement("ul");
        for (const item of shipsTo ){
            ul.appendChild(creatElementWithClassName('li', ' ', item));    
        }
    return ul;    
};
function creatUlShippingCart(productList){
    const ul = document.querySelector("section.cart > ul");
    for (const product of productList)  {
        const li = document.createElement("li");
        li.appendChild(creatListsInsideUl(product)) ;
        ul.appendChild(li);
    }
};
const ul = document.querySelector("section.products > ul");
const span = document.createElement('span.total'); 
// creat list of product object with attributies name, price, rating and shipsTo and renders 
function renderProducts (productList){
    //ul.innerHTML = '';
    let total = 0;
    const ul = document.querySelector("section.products > ul");
    const span = document.createElement('span.total'); 
    for (const product of productList)  {    
        const li = document.createElement("li");      
        li.appendChild(creatListsInsideUl(product)) ; 
        const btn = document.createElement('button');
        const cancelBtn = document.createElement('button')
        span.innerHTML = total;   
        ul.appendChild(li);
        ul.appendChild(btn);
        btn.innerHTML = 'Add to Cart'; 
        cancelBtn.innerHTML = 'Delet'
        const cart = document.querySelector('section.cart > ul');
        const listCart = document.createElement('li');
        const divCart = document.querySelector('div.total')
        btn.addEventListener('click',function(){
            clearList(listCart);
            total += product.price;
            listCart.innerHTML = `
                <li>
                    <div class="name">${product.name}</div>
                    <div class="price">${product.price}</div>
                </li>
            `;
            listCart.appendChild(cancelBtn);
            span.innerHTML = total;
            divCart.appendChild(span);
            cart.appendChild(listCart);                
        });
        cancelBtn.addEventListener('click',function(e){
            total -= product.price; 
            span.innerHTML = total;           
            clearList(listCart);
            this.remove(li.childNodes);
            this.remove(ul.childNodes);
        })     
    }
};
function clearList(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}
const sortOption = {
    Name: 'name',
    Expensive: 'expensive',
    Cheap: 'cheap'
};
function filterByName(productList,searchValue){ 
    if(!searchValue){
        return availableProducts;
    }
    const productsToRender = productList.filter(function(product){
        productName =  product.name.toLowerCase();
        inptutValue =  input.value.toLowerCase();
        if(productName === inptutValue)     
            return true;                    
    });
    return productsToRender;
    //clearList(ul);            
//renderProducts(productsToRender);
};
// showing products that ships to country
function filterByCountryName(produtsList, countryName) { 
    
    if(!countryName){
        return produtsList;
    }
    countryName = countryName.toLowerCase();
    return produtsList.filter(product => {
        for(let shippingCountry of product.shipsTo){
            shippingCountry = shippingCountry.toLowerCase();
            if(shippingCountry === countryName){
                return true;
            }                
        }
        return false;
    })
    /*   
    const selectedCountryName = selectCountry.value;
    productToDisplay = availableProducts.filter(product => {
      return product.shipsTo.some(shippingCountry => {
        return shippingCountry.toLowerCase() === selectedCountryName.toLowerCase();
      });
    });
    clearList(ul);
    renderProducts(productToDisplay);*/
  }
// sort the products
function sortProducts(productLists,selectValue) {
  if (selectValue.value === "cheap") {
    const sortCheapPrice = productLists.sort((a, b) => a.price - b.price);
  return(sortCheapPrice);
  }else if (selectValue.value === "expensive") {
    const sortHighPrice = productLists.sort((a, b) => b.price - a.price);
  return(sortHighPrice);
  }else if(selectValue.value === "name") {
    const sortName = productLists.sort((a, b) => (a.name > b.name ? 1 : -1));
  return(sortName);
  }else 
    return productLists;
}
function refreshProductsView(){    
    const selectValue = selectCountry.value;
    let filterProducts = filterByCountryName(availableProducts, selectValue);
    filterProducts = filterByName(filterProducts,input.value);
    filterProducts = sortProducts(filterProducts,selectSort.value);
    console.log(filterProducts);
    console.log(selectValue);
    renderProducts(filterProducts);
}
input.addEventListener('input',refreshProductsView);
selectCountry.addEventListener("change", refreshProductsView);
selectSort.addEventListener("change",refreshProductsView);
//renderProducts(availableProducts);
refreshProductsView()
const prices = availableProducts.map(product => product.price);
const consLogBack = (str)=> console.log(str); 
sendPricesToServer(prices,consLogBack);