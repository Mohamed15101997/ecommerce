let showPendingOrdersBody = document.getElementById("pendingOrder-page");
let noPendingOrders = document.querySelector(".no-pendingOrders");
pageName = "pendingOrders.html";
/* Show Pending Orders  in Page */
function showPendingOrders(allProducts = []) {
    if (JSON.parse(localStorage.getItem("orders")).length == 0) {
        noPendingOrders.innerHTML = "<div> Not Found  Pending Orders</div>";
    }
    let pendingOrders =
        JSON.parse(localStorage.getItem("orders")) || allProducts;
    let products = JSON.parse(localStorage.getItem("products"));
    pendingOrders.forEach((order) => {
        let productIndex = "";
        if (order.orderStatue == 0 && order.customerID == customerID) {
            let newItem = document.createElement("div");
            newItem.classList.add("card-pending");
            showPendingOrdersBody.appendChild(newItem);
            productIndex = products.findIndex((product) => product.id == 1);
            for (let i = 0; i < order.order.length; i++) {
                productIndex = products.findIndex(
                    (product) => product.id == order.order[i].productId
                );
                newItem.innerHTML += `
                <div class="order-container">
                            <img src="${products[productIndex].image}" />
                            <h4>${products[productIndex].name}</h4>
                        </div>
                        <div class="amount-container">${
                            order.order[i].quantity
                        } pieces</div>
                        <div class="price-container">${
                            products[productIndex].price *
                            order.order[i].quantity
                        }<span>L.E</span></div>
                `;
            }
            newItem.innerHTML += `<div class="total-price">Total Price = <span>${order.totalPrice}</span> L.E</div>`;
        }
    });
}
showPendingOrders();
