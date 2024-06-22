/* ================= Start Orders Page ================= */
if (pageName == "orderCrud") {
    let orderBodyPage = document.getElementById("orders-page");
    function showOrders() {
        getOrders.forEach((order) => {
            let productIndex = "";
            let newItem = document.createElement("div");
            newItem.setAttribute("id", "cats-ul");
            let status = "";
            if (order.orderStatue === 0) {
                status = `<button class='accept' id='accept' onclick='acceptOrder(${order.id})'>Accept</button><button class='reject' id='reject' onclick='rejectOrder(${order.id})'>Reject</button>`;
            } else if (order.orderStatue === 1) {
                status = "<span class='accepted'>Accepted</span>";
            } else {
                status = "<span class='rejected'>Rejected</span>";
            }
            newItem.classList.add("card-order");
            orderBodyPage.appendChild(newItem);
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
}
/* ================= End Orders Page ================= */
/* ================= Start Accept Order ================= */
function acceptOrder(id) {
    let order = getOrders.find((item) => item.id == id);
    order.order.forEach((order) => {
        let findedData = getProducts.find((item) => item.id == order.productId);
        findedData.stockQuantity = findedData.stockQuantity - order.quantity;
    });
    order.orderStatue = 1;
    localStorage.setItem("orders", JSON.stringify(getOrders));
    localStorage.setItem("products", JSON.stringify(getProducts));
    location.reload();
}
/* ================= End Accept Order ================= */
/* ================= Start Reject Order ================= */
function rejectOrder(id) {
    let order = getOrders.find((item) => item.id == id);
    order.orderStatue = 2;
    localStorage.setItem("orders", JSON.stringify(getOrders));
    location.reload();
}
/* ================= End Reject Order ================= */
