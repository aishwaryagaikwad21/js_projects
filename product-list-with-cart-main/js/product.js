let productData = [];

fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    //console.log(data); 
    productData = data
    renderProducts(productData);
  })
  .catch(error => console.error("Error loading JSON:", error));

renderProducts = (data) => {
   const deserts = document.getElementById("deserts")
   deserts.innerHTML = "";
   data.forEach(element => {
        
        const card = document.createElement("div");
        card.className = "card"
        //console.log(element.name)
        const image = document.createElement("img")
        image.className = "image"
        image.src = element.image.desktop
        card.appendChild(image)
        

        const btn = document.createElement("button")
        btn.className = "btn"
        btn.innerHTML = `<img src="./assets/images/icon-add-to-cart.svg" alt="cart icon">Add to cart`
        card.appendChild(btn)
        //deserts.appendChild(btn)

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
        price.innerHTML = `$${element.price}`
        deets.appendChild(price)
        
        card.appendChild(deets)

        deserts.appendChild(card)
   });
}