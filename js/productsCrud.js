let productsContainer = document.getElementById("products-container");

function displayProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    productsContainer.innerHTML = "";

    products.forEach((product) => {
        let div = document.createElement("div");
        div.className = "product-item";
        div.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="card-body">
                        <h3>${product.name} (ID: ${product.id})</h3>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Price:</strong> $${product.price}</p>
                        <p><strong>Description:</strong> ${product.description}</p>
                        <p><strong>Stock Quantity:</strong> ${product.stockQuantity}</p>
                        <p><button id="update-product" onclick="editProducts(${product.id})">Update</button>
                    <button id="delete-product" onclick="deleteProducts(${product.id})">Delete</button></p>
                    </div>
                `;
        productsContainer.appendChild(div);
    });
}

displayProducts();
/*==================== Start Delete Products ====================*/
function deleteProducts(id) {
    let productIndex = getProducts.findIndex((item) => item.id == id);
    getProducts.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(getProducts));
    displayProducts();
}
/*==================== End Delete Products ====================*/
/*==================== Start Edit Products ====================*/
let btnUpdate = document.getElementById("update-product");
let idInput = document.getElementById("product-id");
let nameInput = document.getElementById("product-name");
let categoryInput = document.getElementById("product-category");
let priceInput = document.getElementById("product-price");
let quantityInput = document.getElementById("product-stock");
let descriptionInput = document.getElementById("product-description");
let imageInput = document.getElementById("product-image");
let productImage = document.getElementById("product-img");
function editProducts(id) {
    const reader = new FileReader();
    let product = getProducts.find((item) => item.id == id);
    idInput.value = product.id;
    nameInput.value = product.name;
    categoryInput.value = product.category;
    priceInput.value = product.price;
    quantityInput.value = product.stockQuantity;
    descriptionInput.value = product.description;
    productImage.src = product.image;

    document.getElementById("pup").classList.add("open");
    scroll({
        top: 0,
        behavior: "smooth",
    });
    imageInput.addEventListener("change", function () {
        let selectedFile = this.files[0];
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    });
    reader.onloadend = function () {
        const imageBase64 = reader.result;
        if (productImage) {
            productImage.src = imageBase64; // Update the src attribute with the new image data
        }
    };
    btnUpdate.addEventListener("click", (e) => {
        /*###*/
        product.name = nameInput.value.trim();
        product.category = categoryInput.value.trim();
        product.price = parseFloat(priceInput.value.trim());
        product.description = descriptionInput.value.trim();
        product.stockQuantity = parseInt(quantityInput.value.trim(), 10);
        product.image = productImage.src;

        if (validateProduct(product)) {
            localStorage.setItem("products", JSON.stringify(getProducts));
            alert("Updated Successfully");
        } else {
            alert("Plaese Fix the Error");
            e.preventDefault();
        }
        function validateProduct(product) {
            return (
                product.id &&
                product.name &&
                product.image &&
                product.category &&
                !isNaN(product.price) &&
                product.description &&
                !isNaN(product.stockQuantity)
            );
        }
    });
}
function hide() {
    document.getElementById("pup").classList.remove("open");
}
/*==================== End Edit Products ====================*/
