pageName = "showDetails.html";
let showDetailsBody = document.getElementById("showProductDetails");
let productID = localStorage.getItem("productID");
let product = products.find((product) => product.id == productID);
showDetailsBody.innerHTML = ` 
    <div class="product-container">
        <img src="${product.image}" alt="EliteBook 745 Hp" class="product-image">
        <div class="product-info">
            <h1 class="product-name">${product.name}</h1>
            <p class="product-category"><strong>Category:</strong>${product.category}</p>
            <p class="product-price"><strong>Price:</strong>${product.price}</p>
            <p class="product-details"><strong>Description:</strong>${product.description}</p>
        </div>
    </div>`;