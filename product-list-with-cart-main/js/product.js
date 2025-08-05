let productData = [];

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    //console.log(data); 
    productData = data
    renderProducts(productData);
  })
  .catch(error => console.error("Error loading JSON:", error));

let cart = {}

product = (name, price) => {
  const key = name;
  if(!cart[key]){
    cart[key] ={
      count:0,
      price:0
    };
  }

  cart[key].count += 1;
  cart[key].price += price;

  console.log(`${key} clicked ${cart[key].count} times`)
  console.log(`total price: $${cart[key].price.toFixed(2)}`);
  //console.log(cart)
}



renderProducts = (data) => {
   const deserts = document.getElementById("deserts")
   deserts.innerHTML = "";
   data.forEach(element => {
        
        const card = document.createElement("div");
        card.className = "card"
        //console.log(element.name)
        const image_wrapper = document.createElement("div");
        image_wrapper.className = "image_wrapper"

        const image = document.createElement("img")
        image.className = "image"
        image.src = element.image.desktop

        image_wrapper.appendChild(image)
        

        const btn = document.createElement("button")
        btn.className = "btn"
        btn.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" alt="cart icon">Add to cart`
        image_wrapper.appendChild(btn)
        btn.addEventListener(("click"), ()=> product(element.name, element.price))
        //deserts.appendChild(btn)

        card.appendChild(image_wrapper)

        const deets = document.createElement("div")
        deets.className = "deets"

        const category = document.createElement("p");
        category.className = "category"
        category.innerHTML = element.category
        deets.appendChild(category)
        // card.appendChild(category)

        const name = document.createElement("h4");
        name.className = "name"
        name.innerHTML = element.name
        deets.appendChild(name)
        // card.appendChild(name)

        const price = document.createElement("strong");
        price.className = "price"
        price.innerHTML = `$${element.price.toFixed(2)}`
        deets.appendChild(price)
        
        card.appendChild(deets)

        deserts.appendChild(card)
   });
}