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
   
}