let form = document.getElementById("product-form");
let imageInput = document.getElementById("product-image");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = imageInput.files[0];
    if (file) {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            let product = {
                id: document.getElementById("product-id").value.trim(),
                name: document.getElementById("product-name").value.trim(),
                image: reader.result, // base64 encoded string
                category: document
                    .getElementById("product-category")
                    .value.trim(),
                price: parseFloat(
                    document.getElementById("product-price").value.trim()
                ),
                description: document
                    .getElementById("product-description")
                    .value.trim(),
                stockQuantity: parseInt(
                    document.getElementById("product-stock").value.trim(),
                    10
                ),
            };

            if (validateProduct(product)) {
                if (isProductIdUnique(product.id)) {
                    saveProduct(product);
                    alert("This product saved.");
                    form.reset();
                } else {
                    alert("This product already exists.");
                }
            } else {
                alert("Please fill all fields correctly.");
            }
        };
    } else {
        alert("Please select an image.");
    }
});

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

function isProductIdUnique(id) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    return !products.some((product) => product.id === id);
}

function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
}
