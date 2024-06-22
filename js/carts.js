let showProductsCartsInBody = document.getElementById("cart-products-page");
let noCartProduct = document.querySelector(".no-cart-product");
let orderBtnShow = document.querySelector(".order-btn-container");
pageName = "cartProucts.html";
let orderList;
let sum = 0;
/* Check Order Lost Empty or no */
if (localStorage.orders != null) {
    orderList = JSON.parse(localStorage.orders);
} else {
    orderList = [];
}
/* Show Btn Order */
if (JSON.parse(localStorage.getItem("cartItemsAdded")).length != 0) {
    orderBtnShow.style.display = "block";
}
/* Show Cart Products in Page */
function showProductsCarts(allProducts = []) {
    if (JSON.parse(localStorage.getItem("cartItemsAdded")).length == 0) {
        noCartProduct.innerHTML = "<div> No Item in Cart</div>";
    }
    let cartProducts =
        JSON.parse(localStorage.getItem("cartItemsAdded")) || allProducts;
    let products = JSON.parse(localStorage.getItem("products"));
    let totalPrice = [];
    cartProducts.forEach((item) => {
        let productIndex = products.findIndex(
            (product) => product.id == item.productId
        );
        /**/
        let newItem = document.createElement("div");
        let btnItem = document.createElement("button");
        let btnText = document.createTextNode("Click");
        newItem.classList.add("card-cart");
        btnItem.appendChild(btnText);
        showProductsCartsInBody.appendChild(newItem);
        btnItem.after(newItem);
        let itemPrice = products[productIndex].price * item.quantity;
        totalPrice.push(itemPrice);
        newItem.innerHTML = `<div class="img-container">
                                                    <img src="${products[productIndex].image}" />
                                            </div>
                                            <div class="content-container">
                                                <h2>${products[productIndex].name}</h2>
                                                <h5>${products[productIndex].category}</h5>
                                                <p>
                                                ${products[productIndex].description}
                                                </p>
                                            </div>
                                            <div class="count-container">
                                                <div class="count-number">
                                                    <button onclick="removeFromCart(${item.productId})"><i class="fa-solid fa-arrow-left"></i></button><span>${item.quantity}</span>
                                                        <button onclick="addToCart(${item.productId})">
                                                            <i class="fa-solid fa-arrow-right"></i>
                                                            </button>
                                                    </div>
                                                    <div class="price-cont">
                                                    <span>${itemPrice}</span>
                                                    L.E
                                                </div>
                                            </div>`;
    });
    if (JSON.parse(localStorage.getItem("cartItemsAdded")).length != 0) {
        sum = totalPrice.reduce(function (acc, e) {
            return acc + e;
        });
    }
}
showProductsCarts();
/* Remove From Carts */
function removeFromCart(id) {
    let cartProducts = localStorage.getItem("cartItemsAdded");
    if (cartProducts) {
        let items = JSON.parse(cartProducts);
        items.forEach((item) => {
            if (item.productId == id) {
                if (item.quantity > 1) {
                    item.quantity = item.quantity - 1;
                    localStorage.setItem(
                        "cartItemsAdded",
                        JSON.stringify(items)
                    );
                } else {
                    let filteredItem = items.filter(
                        (item) => item.productId !== id
                    );
                    localStorage.setItem(
                        "cartItemsAdded",
                        JSON.stringify(filteredItem)
                    );
                }
            }
        });
    }
    location.reload();
}
function addToCart(id) {
    let cartProducts = localStorage.getItem("cartItemsAdded");
    if (cartProducts) {
        let items = JSON.parse(cartProducts);
        items.forEach((item) => {
            if (item.productId == id) {
                item.quantity = item.quantity + 1;
                localStorage.setItem("cartItemsAdded", JSON.stringify(items));
            }
        });
    }
    location.reload();
}
/* Add To Order List */
function addToOrderList() {
    let cart = JSON.parse(localStorage.getItem("cartItemsAdded")) || [];
    let orderListObj = {
        id: new Date().getTime().toString(),
        order: cart,
        totalPrice: sum,
        orderStatue: 0,
        customerID: customerID,
    };
    orderList.push(orderListObj);
    localStorage.setItem("orders", JSON.stringify(orderList));
    cart.splice(0);
    localStorage.setItem("cartItemsAdded", JSON.stringify(cart));
    location.reload();
}
