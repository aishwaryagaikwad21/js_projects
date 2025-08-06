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

product = (name, price, category) => {
  const key = name;
  
  if(!cart[key]){
    cart[key] ={
      count:0,
      price:0,
      unitPrice:price
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

}

 updateCartUI = (name,price,category) => {
    const remove_cart = document.getElementById("empty_cart")
    remove_cart.src = ""

    const carbon_neutral = document.getElementById("carbon_neutral")
    carbon_neutral.style.display = "block"

    const confirm_button = document.getElementById("confirm_button")
    confirm_button.style.display = "block"

    const key = name;
    if(cart[key].count === 1){ //item goes 1st time inside cart
      const cart_name = document.getElementById("cart_item_name")
      const item_name = document.createElement("strong")
      item_name.innerHTML = key
      cart_name.appendChild(item_name)

      const item_quant = document.getElementById("item_quant")
      const quantity = document.createElement("strong")
      quantity.id = `quan-${key}`
      quantity.innerHTML = cart[key].count
      item_quant.appendChild(quantity)

      const item_price = document.getElementById("item_price")
      const item_p = document.createElement("p")
      item_p.id = `item-p-${key}`
      item_p.innerHTML = cart[key].price
      item_price.appendChild(item_p)

      const item_total = document.getElementById("item_total")
      const item_tot = document.createElement("p")
      item_tot.id = `item-tot-${key}`
      item_tot.innerHTML = (cart[key].count) * Number(cart[key].unitPrice)
      item_total.appendChild(item_tot)

    } else{
      const quantity = document.getElementById(`quan-${key}`)
      quantity.innerHTML = cart[key].count

      const item_tot = document.getElementById(`item-tot-${key}`)
      item_tot.innerHTML = Number(cart[key].count) * Number(cart[key].unitPrice)
    }

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

   const carbon_neutral = document.getElementById("carbon_neutral")
    carbon_neutral.style.display = "none"

    const confirm_button = document.getElementById("confirm_button")
    confirm_button.style.display = "none"

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
        btn.addEventListener(("click"), ()=> {
          product(element.name, element.price,element.category)
          updateCartUI(element.name, element.price, element.category)
        })

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