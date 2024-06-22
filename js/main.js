let showProductsContainer = document.getElementById("show-products");
let ProductList = document.querySelectorAll(".page .show-products .card");
let wishMenu = document.querySelector(".wishList-products");
let wishProducts = document.querySelector(".wishList-products div");
let wishIcon = document.getElementById("wishList-icon");
/* Start Add Local Stroge for WishList  */
let wishList;
if (localStorage.getItem("wishList")) {
    wishList = JSON.parse(localStorage.wishList);
} else {
    wishList = [];
}
/* redirect btn to view all WishList Products*/
document
    .getElementById("btn-viewAllWish")
    .addEventListener("click", function () {
        window.location = "wishProduct.html";
    });
/* redirect btn to view all Pending Order*/
document.getElementById("penddingOrder").addEventListener("click", function () {
    window.location = "pendingOrders.html";
});
/* redirect btn to view all Completed Order*/
document
    .getElementById("completedOrder")
    .addEventListener("click", function () {
        window.location = "completedOrders.html";
    });
/* ================= Start Show Categories ================= */
let showCatsInSidebar = document.getElementById("cats-ul");
function showCatsInBody() {
    let newItem = document.createElement("ul");
    newItem.setAttribute("id", "cats-ul");
    showCatsInSidebar.appendChild(newItem);
    newItem.innerHTML += ` <li class="active"><a href="#"><span class="cats-name">All</span></a></li>`;
    for (let i = 0; i < getCategories.length; i++) {
        newItem.innerHTML += `
        <li>
            <a href="#"><span class="cats-name">${getCategories[i].Name}</span></a>
        </li>
        `;
    }
}
showCatsInBody();
let list = document.querySelectorAll("#cats-ul li");
/* ================= End Show Categories ================= */
/* Add And Remove Class Active From Categories */
function AddClassActive() {
    list.forEach(function (li) {
        li.addEventListener("click", function () {
            list.forEach(function (li) {
                li.classList.remove("active");
            });
            this.classList.add("active");
            this.setAttribute(
                "data-cat",
                `.${this.children[0].children[0].innerHTML}`
            );
            hideProducts();
            document
                .querySelectorAll(this.dataset.cat)
                .forEach(function (products) {
                    products.parentElement.parentElement.parentElement.style.display =
                        "block";
                });
        });
    });
}
AddClassActive();
/* Show Product to page */
function showProductsInBody() {
    let card = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].stockQuantity != 0) {
            card += `
        <div  class="card">
            <div id="go-show-product" onclick="showDetails(${products[i].id})">
                <img src="${products[i].image}" />
                <div class="content">
                    <h3>${products[i].name}</h3>
                    <h5>${products[i].category}</h5>
                    <p>
                    ${products[i].description}
                    </p>
                </div>
            </div>
            <div class="info">
                <div class="fav-icon-container">
                    <button onclick="addToWishList(${products[i].id})"><i  id = "fav" class="fa-regular fa-heart fav"></i><input type="hidden" value="${products[i].id}"></button>
                </div>
                <button onclick="addToCart(${products[i].id})"><i class="fa-solid fa-cart-shopping"></i></button>
                <div>${products[i].price} <span>L.E</span></div>
            </div>
        </div>
        `;
        }
    }
    showProductsContainer.innerHTML = card;
    changeFav();
    AddClassCatToProducts();
}
showProductsInBody();
/* Change Favourite Icon */
function changeFav() {
    document.querySelectorAll(".fav").forEach((e) => {
        let nextSibling = +e.nextElementSibling.value;
        for (let i = 0; i < wishList.length; i++) {
            if (
                wishList[i].wishId == nextSibling &&
                wishList[i].customerID == customerID
            ) {
                e.classList.remove("fa-regular");
                e.classList.add("fa-solid");
                e.style.color = "#70a1ff";
            }
        }
        e.addEventListener("click", function () {
            if (this.classList.contains("fa-regular") === true) {
                this.classList.remove("fa-regular");
                this.classList.add("fa-solid");
                this.style.color = "#70a1ff";
            } else {
                this.classList.remove("fa-solid");
                this.classList.add("fa-regular");
                this.style.color = "#777";
            }
        });
    });
}
/* Add Classes for Products */
function AddClassCatToProducts() {
    document
        .querySelectorAll(".page .show-products .card")
        .forEach(function (products) {
            products.children[0].children[1].children[1].classList.add("All");
            products.children[0].children[1].children[1].classList.add(
                `${products.children[0].children[1].children[1].innerHTML}`
            );
        });
}
/* Hide Products */
function hideProducts() {
    document
        .querySelectorAll(".page .show-products .card")
        .forEach(function (products) {
            products.style.display = "none";
        });
}
/* Start Add To Cart */
function addToCart(id) {
    cartProducts.innerHTML = "";
    if (localStorage.getItem("login-data")) {
        let itemIndex = cart.findIndex((e) => e.productId == id);
        if (cart.length == 0) {
            cart = [
                {
                    productId: id,
                    customerID: customerID,
                    quantity: 1,
                },
            ];
            drawList();
        } else if (itemIndex < 0) {
            cart.push({
                productId: id,
                customerID: customerID,
                quantity: 1,
            });
            drawList();
        } else {
            cart[itemIndex].quantity += 1;
            drawList();
        }
        localStorage.setItem("cartItemsAdded", JSON.stringify(cart));
        badge.style.display = "block";
        let totalQuantity = 0;
        cart.forEach((item) => {
            totalQuantity = totalQuantity + item.quantity;
        });
        badge.innerHTML = totalQuantity;
    } else {
        window.location = "login.html";
    }
}

function setItemInWishMenu() {
    wishList.forEach((item) => {
        if (item.customerID == customerID) {
            let productIndex = products.findIndex(
                (product) => product.id == item.wishId
            );
            wishProducts.innerHTML += `<div class="wish-item"><img src="${products[productIndex].image}"><p>${products[productIndex].name}</p></div>`;
        }
    });
}
setItemInWishMenu();

function openWishMenu() {
    if (wishMenu.style.display === "none") {
        if (wishProducts.innerHTML != "") {
            wishMenu.style.display = "block";
        }
    } else {
        wishMenu.style.display = "none";
    }
}
wishIcon.addEventListener("click", openWishMenu);

/* Show Details*/
function showDetails(id) {
    localStorage.setItem("productID", id);
    window.location = "showDetails.html";
}
/* Add Item To Wish List */
function addToWishList(id) {
    let idFound = getWishs.filter(function (index) {
        return index.wishId === id;
    });
    let customerIndex = idFound.findIndex(function (index) {
        return index.customerID === customerID;
    });

    if (idFound) {
        if (customerIndex >= 0) {
            for (let i = 0; i < wishList.length; i++) {
                if (wishList[i].wishId == id) {
                    if (wishList[i].customerID == customerID) {
                        wishList.splice(i, 1);
                    }
                }
            }
        } else {
            wishList.push({
                wishId: id,
                customerID: customerID,
            });
        }
    } else {
        wishList.push({
            wishId: id,
            customerID: customerID,
        });
    }
    console.log(wishList);
    localStorage.setItem("wishList", JSON.stringify(wishList));
    location.reload();
}
