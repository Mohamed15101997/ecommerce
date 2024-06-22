let customerID = JSON.parse(localStorage.getItem("login-data"));
/* ================= Start Get All Products ================= */
let getProducts;
if (localStorage.products) {
    getProducts = JSON.parse(localStorage.products);
} else {
    getProducts = [];
    localStorage.setItem("products", JSON.stringify(getProducts));
}
/* ================= End Get All Products ================= */
/* ================= Start Get All Categories ================= */
let getCategories;
if (localStorage.categories) {
    getCategories = JSON.parse(localStorage.categories);
} else {
    getCategories = [];
    localStorage.setItem("categories", JSON.stringify(getCategories));
}
/* ================= End Get All Categories ================= */
/* ================= Start Get All Carts ================= */
let getCarts;
if (localStorage.cartItemsAdded) {
    getCarts = JSON.parse(localStorage.cartItemsAdded);
} else {
    getCarts = [];
    localStorage.setItem("cartItemsAdded", JSON.stringify(getCarts));
}
/* ================= End Get All Carts ================= */
/* ================= Start Get All Wishs ================= */
let getWishs;
if (localStorage.wishList) {
    getWishs = JSON.parse(localStorage.wishList);
} else {
    getWishs = [];
    localStorage.setItem("wishList", JSON.stringify(getWishs));
}
/* ================= End Get All Wishs ================= */
/* ================= Start Get All Orders ================= */
let getOrders;
if (localStorage.orders) {
    getOrders = JSON.parse(localStorage.orders);
} else {
    getOrders = [];
    localStorage.setItem("orders", JSON.stringify(getOrders));
}
/* ================= End Get All Orders ================= */
/* ================= Start Get All Users ================= */
let getUsers;
if (localStorage.users) {
    getUsers = JSON.parse(localStorage.users);
} else {
    getUsers = [];
    localStorage.setItem("users", JSON.stringify(getUsers));
}
/* ================= End Get All Users ================= */
/* ================ Start Get All CategoryUsers ================ */
/* ================ End Get All CategoryUsers ================ */
/* ================ Start Get All WishUsers ================ */
let filterdWishs = getWishs.filter(function (wishItem) {
    return wishItem.customerID == customerID;
});
/* ================ End Get All WishUsers ================ */
