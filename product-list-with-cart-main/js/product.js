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
        image.src = element.image.thumbnail
        card.appendChild(image)
        

        const btn = document.createElement("button")
        btn.className = "btn"
        btn.innerText = "Add to cart"
        card.appendChild(btn)
        //deserts.appendChild(btn)

        const category = document.createElement("p");
        category.className = "category"
        category.innerHTML = element.category
        card.appendChild(category)

        const name = document.createElement("h4");
        name.className = "name"
        name.innerHTML = element.name
        card.appendChild(name)

        const price = document.createElement("strong");
        price.className = "price"
        price.innerHTML = `$${element.price}`
        card.appendChild(price)

        deserts.appendChild(card)
   });
}