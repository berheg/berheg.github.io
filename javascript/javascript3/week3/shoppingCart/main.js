const addBtn = document.querySelector('button.addBtn');
const searchBtn = document.querySelector('button.searchBtn');
const usernameP = document.querySelector('#username');
const inputProduct = document.querySelector('input.product');
let username;
let userChecker = false; 
class Product {
  constructor(name, price, description) {
    this.name = name;
    this.price = price;
    this.description = description;
  }    
} 
class ShoppingCart {
  constructor(products) {
    this.products = products;
  }

  addProduct(product) {
    // Implement functionality here
    this.products.push(product);
  }

  removeProduct(product) {
    // Implement functionality here
    const removeIndex = this.products.indexOf(product);
    this.products.splice(removeIndex, 1);
  }

  searchProduct(productName) {
    // Implement functionality here
    return this.products.filter((product) => {
      return product.name === productName.name;
    })
  }  
  getTotal() {
    // Implement functionality here    
    for (let product of this.products) {
      const priceProduct = parseInt(product.price);
      total += priceProduct;
    }
    return total;
  } 
     
  renderProducts() {    
    let total = 0;
    const ul = document.querySelector("ul.productsList");
    const span = document.createElement('span.total'); 
    for (let product of this.products)  {    
      const li = document.createElement("li");  
      li.innerHTML = product.name;  
      li.appendChild(creatListsInsideUl(product));         
      const btn = document.createElement('button');
      const cancelBtn = document.createElement('button');
      console.log(product.name);
      span.innerHTML = total;   
      ul.appendChild(li);
      ul.appendChild(btn);
      btn.innerHTML = 'Add to Cart'; 
      cancelBtn.innerHTML = 'Delet' 
      const cart = document.querySelector('section.cart > ul');
      const listCart = document.createElement('li');
      const divCart = document.querySelector('div.total');
          
      btn.addEventListener('click',function(){
        clearList(listCart);
        if(!userChecker){
          usernameP.innerHTML += username;
          userChecker = true;
        }
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
      });
    };
  };
  getUser() {
    // Implement functionality here    
    const min = 1;
    const max = 10;
    const userNumber = Math.floor (Math.random () * (max - min)) + min;
    console.log(userNumber);
    fetch(`https://jsonplaceholder.typicode.com/users/${userNumber}`)
    .then(response => response.json())
    .then(json =>{username = json.username;
    console.log(username)} )
    .catch(error => {
      console.log (error);
      usernameP.innerHTML = 'No';
    });
  }
} 
function clearList(parent){
  while(parent.firstChild){
      parent.removeChild(parent.firstChild);
  }
}   
const flatscreen = new Product("flat-screen", 5000, 'Samsung 49" QLED smart ');
const flatscreen2 = new Product("flat-screen2", 5000, 'Samsung TV UHD LED 65" ');
const hpLaptop = new Product("hp-Laptop", 4000, 'HP 14-dk0002no 14" ');

const shoppingCart = new ShoppingCart([]);
shoppingCart.addProduct(flatscreen);
shoppingCart.addProduct(flatscreen2); 
shoppingCart.addProduct(hpLaptop);
console.log(shoppingCart.products); 
shoppingCart.getUser();
console.log(username);
shoppingCart.renderProducts();
addBtn.addEventListener('click', addToProduct);
searchBtn.addEventListener('click', addShoppingCart);
function addToProduct(){
  //const inputProduct = document.querySelector('input.product');
  console.log(inputProduct.Value);
  if(inputProduct.Value === ''){
    alert("Please fill all three input")
  }else{

  }
}
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
      ul.appendChild(creatElementWithClassName('li', 'rating', product.description));
  return ul ;     
};
function addShoppingCart(product){
  const ul = document.querySelector("section.cart > ul");    
    const li = document.createElement("li");
    li.appendChild(creatListsInsideUl(product)) ;
    ul.appendChild(li);
}
function creatUlShippingCart(productList){
  const ul = document.querySelector("section.cart > ul");
  for (const product of productList)  {
    const li = document.createElement("li",'name',product.name);
    li.innerHTML = product.name               
    ul.appendChild(li);
  }
};
