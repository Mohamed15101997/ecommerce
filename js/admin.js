let list = document.querySelectorAll(".page .side-menu ul li");
let adminNameNav = document.getElementById("admin-name");
let AdminLogout = document.getElementById("admin-logout");
let adminID = +localStorage.getItem("login-data");
let users = JSON.parse(localStorage.getItem("users"));
let user = users.find((item) => item.id == adminID);
/* ================= Start Add & Remove Class Active ================= */
list.forEach((li) => {
    li.addEventListener("click", function () {
        list.forEach((li) => {
            li.classList.remove("active");
        });
        this.classList.add("active");
    });
});
/* ================= End  Add & Remove Class Activer ================= */
/* ================= Start Name Admin in header ================= */
if (localStorage.getItem("login-data")) {
    adminNameNav.innerHTML = user.username;
}
/* ================= End Name Admin  in header ================= */
/* ================= Start LogOut Admin ================= */
AdminLogout.addEventListener("click", logoutAdmin);
function logoutAdmin() {
    localStorage.removeItem("login-data");
    window.location = "login.html";
}
/* ================= End LogOut Admin ================= */
/* ================= Start Get Total Items ================= */
if (pageName == "dashboard") {
    let totOrder = document.querySelector(".tickets .tot-orders span");
    let totPeOrder = document.querySelector(".tickets .tot-peOrders span");
    let totReOrder = document.querySelector(".tickets .tot-reOrders span");
    let totAccOrder = document.querySelector(".tickets .tot-accOrders span");
    let totUsers = document.querySelector(".tickets .tot-users span");
    let totCats = document.querySelector(".tickets .tot-cats span");
    let totProds = document.querySelector(".tickets .tot-prod span");
    // total Products
    totProds.innerHTML = getProducts.length;
    // total categories
    totCats.innerHTML = getCategories.length;
    // total order
    totOrder.innerHTML = getOrders.length;
    // total pending order
    let countPending = 0;
    getOrders.forEach((pendingOrder) => {
        if (pendingOrder.orderStatue === 0) {
            countPending += 1;
        }
    });
    totPeOrder.innerHTML = countPending;
    // total rejected order
    let countRejected = 0;
    getOrders.forEach((rejectedOrder) => {
        if (rejectedOrder.orderStatue === 2) {
            countRejected += 1;
        }
    });
    totReOrder.innerHTML = countRejected;
    // total Accepted order
    let countAccepted = 0;
    getOrders.forEach((acceptedOrder) => {
        if (acceptedOrder.orderStatue === 1) {
            countAccepted += 1;
        }
    });
    totAccOrder.innerHTML = countAccepted;
    // total Users
    let countUsers = 0;
    getUsers.forEach((users) => {
        if (users.role === "0") {
            countUsers += 1;
        }
    });
    totUsers.innerHTML = countUsers;
}
/* ================= End Get Total Items ================= */
/* ================= Start show Latest Categories ================= */
if (pageName == "dashboard") {
    let latesCatsBody = document.getElementById("latest-cats");
    function showLatestCats() {
        getCategories.reverse();
        let sliceCats = getCategories.slice(0, 5);
        let table = "";
        for (let i = 0; i < sliceCats.length; i++) {
            table += `
                    <tr>
                        <td>${sliceCats[i].id}</td>
                        <td>${sliceCats[i].Name}</td>
                        <td>${sliceCats[i].description}</td>
                    </tr>
                    `;
        }
        latesCatsBody.innerHTML = table;
    }
    showLatestCats();
}
/* ================= End show Latest Categories  ================= */
/* ================= Start show Latest Products ================= */
if (pageName == "dashboard") {
    let latesProductsBody = document.getElementById("latest-prods");
    function showLatestProducts() {
        getProducts.reverse();
        let sliceProds = getProducts.slice(0, 5);
        let table = "";
        for (let i = 0; i < sliceProds.length; i++) {
            table += `
                <tr>
                    <td>${sliceProds[i].id}</td>
                    <td>${sliceProds[i].name}</td>
                    <td>${sliceProds[i].category}</td>
                    <td>${sliceProds[i].description}</td>
                    <td>${sliceProds[i].price} L.E</td>
                    <td><img src="${sliceProds[i].image}" alt=""/></td>
                    <td>${sliceProds[i].stockQuantity}</td>
                </tr>
                `;
        }
        latesProductsBody.innerHTML = table;
    }
    showLatestProducts();
}
/* ================= End show Latest Products  ================= */
/* ================= Start show Latest Customers ================= */
if (pageName == "dashboard") {
    let latesCustomersBody = document.getElementById("latest-customers");
    function showLatestCustomers() {
        getUsers.reverse();
        let sliceUsers = getUsers.slice(0, 5);
        let table = "";
        for (let i = 0; i < sliceUsers.length; i++) {
            if (sliceUsers[i].role == "0") {
                table += `
                    <tr>
                        <td>${sliceUsers[i].id}</td>
                        <td>${sliceUsers[i].username}</td>
                        <td>${sliceUsers[i].email}</td>
                    </tr>
                    `;
            }
        }
        latesCustomersBody.innerHTML = table;
    }
    showLatestCustomers();
}
/* ================= End show Latest Customers  ================= */
/* ================= Start show Latest Orders  ================= */
if (pageName == "dashboard") {
    let latestOrderBody = document.getElementById("latest-order-body");
    let latestOrderBodyNotFound = document.getElementById(
        "latest-order-data-body"
    );
    if (getOrders.length != 0) {
        function showOrders() {
            getOrders.reverse();
            let sliceOrders = getOrders.slice(0, 5);
            sliceOrders.forEach((order) => {
                let productIndex = "";
                let newItem = document.createElement("div");
                newItem.setAttribute("id", "cats-ul");
                let status = "";
                if (order.orderStatue === 0) {
                    status = `<span class='pending'>Pending</span>`;
                } else if (order.orderStatue === 1) {
                    status = "<span class='accepted'>Accepted</span>";
                } else {
                    status = "<span class='rejected'>Rejected</span>";
                }
                newItem.classList.add("card-order");
                latestOrderBody.appendChild(newItem);
                for (let i = 0; i < order.order.length; i++) {
                    productIndex = getProducts.findIndex(
                        (product) => product.id == order.order[i].productId
                    );
                    newItem.innerHTML += `
            <div class="order-container">
                        <img src="${getProducts[productIndex].image}" />
                        <h4>${getProducts[productIndex].name}</h4>
                    </div>
                    <div class="amount-container">${
                        order.order[i].quantity
                    } pieces</div>
                    <div class="price-container">${
                        getProducts[productIndex].price *
                        order.order[i].quantity
                    }<span>L.E</span></div>
            `;
                }
                newItem.innerHTML += `<div class="total-price">Total Price = <span>${order.totalPrice}</span> L.E</div>`;
                newItem.innerHTML += `<div class="total-price">Customer ID = <span> ${order.customerID}</span></</div>`;
                newItem.innerHTML += `<div class="btns-cont"> ${status}</</div>`;
            });
        }
        showOrders();
    } else {
        let newItem = document.createElement("div");
        newItem.classList.add("not-found-data");
        latestOrderBodyNotFound.appendChild(newItem);
        newItem.innerHTML += `<div> No Item Found</div>`;
    }
}
/* ================= End show Latest Orders  ================= */
