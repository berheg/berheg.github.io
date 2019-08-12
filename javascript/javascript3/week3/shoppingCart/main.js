class Product {
    constructor(name, price) {
      this.name = name;
      this.price = price;
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
      return this.products.reduce((total, product) => {
        total += product.price;
        return total;
      }, 0);
    }
    
    renderProducts() {
      
      function createList(parent, data) {
        const list = document.createElement("li");
        list.innerHTML = data;
        parent.appendChild(list);
        return list;
      }
  
      const productsList = document.querySelector("ul.productsList");
      this.products.forEach(product => {
        productsList.appendChild(createList(productsList, product.name));
      });
    }
  
    getUser() {
      // Implement functionality here
      return fetch(`https://jsonplaceholder.typicode.com/users/1`)
      .then(response => response.json())
    }
  } 
  
  const flatscreen = new Product("flat-screen", 5000);
  const flatscreen2 = new Product("flat-screen2", 5000);
  
  const shoppingCart = new ShoppingCart([]);
  shoppingCart.addProduct(flatscreen);
  shoppingCart.addProduct(flatscreen2);  
   
  shoppingCart.renderProducts();
  