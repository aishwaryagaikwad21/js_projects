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

product = (name, price, category,image_wrapper) => {
  const key = name;
  
  if(!cart[key]){
    cart[key] ={
      count:0,
      price:0
    };
  }

  if(cart[key].count === 0){
    cart[key].count += 1;
    cart[key].price += price;
  }

  console.log(`${key} clicked ${cart[key].count} times`)
  console.log(`total price of ${key}: $${cart[key].price.toFixed(2)}`);
  //console.log(cart)
  
  let img = document.getElementById(`img-${category.toLowerCase().replaceAll(" ", "-")}`)
  img.style.border = "2px hsl(14, 86%, 42%) solid"

  let btn = document.getElementById(`btn-${category.toLowerCase().replaceAll(" ", "-")}`)
  btn.style.backgroundColor = "hsl(14, 86%, 42%)"
  btn.style.color = "hsl(20, 50%, 98%)"
  btn.innerText= ""

  const quantityControls = document.createElement("div");
  quantityControls.className = "quantityControls"

  const count = document.createElement("span")
  count.className = "count";
  count.innerText = cart[key].count

  const decrement = document.createElement("button");
  decrement.className = "decrement"
  decrement.id = `dec-${category.toLowerCase().replaceAll(" ", "-")}`
  decrement.innerHTML = `<img src='./assets/images/icon-decrement-quantity.svg' alt='decrement'>`
  
  decrement.addEventListener(("click"), () => {
    if(cart[key].count > 1){
      cart[key].count--;
      cart[key].price -= price;
      count.innerText = cart[key].count;
      console.log(`${key} count: ${cart[key].count}, total: $${cart[key].price.toFixed(2)}`);
    }
    else{
        delete cart[key]
        const newBtn = document.createElement("button");
        newBtn.className = "btn"
        newBtn.id = `btn-${category.toLowerCase().replaceAll(" ","-")}`;
        newBtn.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" alt="cart icon">Add to cart`
        newBtn.addEventListener("click", () => product(name,price,category,image_wrapper))
        image_wrapper.appendChild(newBtn)
        
    }
  })

  const increment = document.createElement("button");
  increment.className = "increment"
  increment.innerHTML = `<img src='./assets/images/icon-increment-quantity.svg' alt='increment'>`
  // btn.appendChild(increment)
  increment.addEventListener("click", () => {
    cart[key].count += 1;
    cart[key].price += price;
    count.innerText = cart[key].count;
  })

  quantityControls.appendChild(decrement);
  quantityControls.appendChild(count);
  quantityControls.appendChild(increment)

  btn.appendChild(quantityControls);

  //Cart container
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.count, 0);
  console.log(`Total items: ${totalItems}`);
  document.getElementById("totalItems").innerText = totalItems;

  const totalAmount = Object.values(cart).reduce((sum, item) => sum + item.price, 0)
  console.log(`Amount: $${totalAmount}`)
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
        image_wrapper.id = `image_wrapper-${element.category.toLowerCase().replaceAll(" ", "-")}`

        const image = document.createElement("img")
        image.className = "image"
        image.id = `img-${element.category.toLowerCase().replaceAll(" ", "-")}`;
        image.src = element.image.desktop

        image_wrapper.appendChild(image)
        

        const btn = document.createElement("button")
        btn.className = "btn"
        btn.id = `btn-${element.category.toLowerCase().replaceAll(" ", "-")}`; // "Strawberry Cake --> btn-strawberry-cake"
        btn.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" alt="cart icon">Add to cart`
        image_wrapper.appendChild(btn)
        btn.addEventListener(("click"), ()=> product(element.name, element.price,element.category,image_wrapper,card))

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