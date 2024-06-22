let showProductsWishInBody = document.getElementById("wish-products-page");
let noWishProduct = document.querySelector(".no-wish-product");
pageName = "wishProucts.html";
/* Show Wish Products in Page */
function showProductsWish(allProducts = []) {
    if (JSON.parse(localStorage.getItem("wishList")).length == 0) {
        noWishProduct.innerHTML = "<div> No Item in Wish</div>";
    }
    let wishProducts =
        JSON.parse(localStorage.getItem("wishList")) || allProducts;
    let products = JSON.parse(localStorage.getItem("products"));
    wishProducts.forEach((item) => {
        if (item.customerID == customerID) {
            let productIndex = products.findIndex(
                (product) => product.id == item.wishId
            );
            /**/
            let newItem = document.createElement("div");
            newItem.classList.add("card-wish");
            showProductsWishInBody.appendChild(newItem);
            newItem.innerHTML = `<div class="img-container">
                                                    <img src="${products[productIndex].image}" />
                                            </div>
                                            <div class="content-container">
                                                <h2>${products[productIndex].name}</h2>
                                                <h5>${products[productIndex].category}</h5>
                                                <p>
                                                ${products[productIndex].description}
                                                </p>
                                            </div>`;
        }
    });
}
showProductsWish();
