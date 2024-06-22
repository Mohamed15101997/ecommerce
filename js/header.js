let cartLi = document.getElementById("cart-li");
let loginLi = document.getElementById("login-li");
let logoutLi = document.getElementById("logout-li");
let usernameLi = document.getElementById("username-li");
let userLogedId = +localStorage.getItem("login-data");
let users = JSON.parse(localStorage.getItem("users"));
let badge = document.querySelector(".badge");
let cartProducts = document.querySelector(".cart-products div");
let cartIcon = document.getElementById("cart-icon");
let cartMenu = document.querySelector(".cart-products");
let logedUser;
let pageName;
let cart;
/* Start Add Local Stroge for Cart */

if (localStorage.getItem("cartItemsAdded")) {
    cart = JSON.parse(localStorage.cartItemsAdded);
} else {
    cart = [];
}
function openCartMenu() {
    if (cartMenu.style.display === "none") {
        if (cartProducts.innerHTML != "") {
            cartMenu.style.display = "block";
        }
    } else {
        cartMenu.style.display = "none";
    }
}
cartIcon.addEventListener("click", openCartMenu);
let totalQuantity = 0;
cart.forEach((item) => {
    totalQuantity = totalQuantity + item.quantity;
});
badge.innerHTML = totalQuantity;
/*================= Start define product /*=================*/
let products;
if (localStorage.products != null) {
    products = JSON.parse(localStorage.products);
} else {
    products = [];
}
/*================= End define product /*=================
/* Handle Header With UserName [Login]*/
if (localStorage.getItem("login-data")) {
    cartLi.style.display = "block";
    logedUser = users.find((item) => {
        return item.id == userLogedId;
    });
    loginLi.remove();
    usernameLi.children[0].children[1].innerHTML = logedUser.username;
    usernameLi.style.display = "block";
    logoutLi.style.display = "block";
}
logoutLi.addEventListener("click", logoutUser);
function logoutUser() {
    localStorage.removeItem("login-data");
    window.location = "login.html";
}
/*================= Start Manage Cart Icon /*=================*/
/* redirect btn to view all Cart Products*/
document.getElementById("btn-viewall").addEventListener("click", function () {
    window.location = "cartProduct.html";
});
// /* Add Number To Badge */
function badgeNumber() {
    if (badge.innerHTML === "0") {
        badge.style.display = "none";
    }
}
/* Start Draw in Cart List*/
function drawList() {
    cart.forEach((item) => {
        let productIndex = products.findIndex(
            (product) => product.id == item.productId
        );
        let newItem = document.createElement("div");
        newItem.classList.add("cart-item");
        cartProducts.appendChild(newItem);
        newItem.innerHTML = `<img src="${products[productIndex].image}"><p>${products[productIndex].name}</p><span>${item.quantity}</span>`;
    });
}
/**/
badgeNumber();
/* Show Item In List Cart */
function setItemInCartMenu() {
    cart.forEach((item) => {
        let productIndex = products.findIndex(
            (product) => product.id == item.productId
        );
        cartProducts.innerHTML += `<div class="cart-item"><img src="${products[productIndex].image}"><p>${products[productIndex].name}</p><span>${item.quantity}</span></div>`;
    });
}
setItemInCartMenu();
/*================= End Manage Cart Icon /*=================*/
