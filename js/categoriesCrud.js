let Name = document.getElementById("Category Name");
let description = document.getElementById("Category description");
let submit = document.getElementById("submit");
let mood = "Create";
let tmp;
let oldcategory;
//create product
let datapro;
if (localStorage.categories != null) {
    datapro = JSON.parse(localStorage.categories);
} else {
    datapro = [];
}

submit.onclick = function () {
    let newpro = {
        id: new Date().getTime().toString(),
        Name: Name.value.trim()[0].toUpperCase() + Name.value.trim().slice(1),
        description: description.value.trim(),
    };
    if (Name.value != "" && description.value != "") {
        if (mood === "Create") {
            datapro.push(newpro);
        } else {
            datapro[tmp] = newpro;
            upDateProductCategory(
                Name.value.trim()[0].toUpperCase() + Name.value.trim().slice(1)
            );
            mood = " Create";
            submit.innerHTML = "Create";
        }
        cleardata();
    }

    //save localstorage
    localStorage.setItem("categories", JSON.stringify(datapro));

    showData();
};

// //clear inputs

function cleardata() {
    Name.value = "";
    description.value = "";
}

// //read

function showData() {
    let table = "";
    for (let i = 0; i < datapro.length; i++) {
        table += `
            <tr>
                        <td>${datapro[i].id}</td>
                        <td>${datapro[i].Name}</td>
                        <td>${datapro[i].description}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            `;
    }
    document.getElementById("tbody").innerHTML = table;
}
showData();
// //delete
function deleteData(i) {
    datapro.splice(i, 1);
    localStorage.categories = JSON.stringify(datapro);
    showData();
}
// //update
function updateData(i) {
    Name.value = datapro[i].Name;
    description.value = datapro[i].description;
    submit.innerHTML = "Update";
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
    productsCat = datapro[i].Name;
    console.log(productsCat);
    oldcategory = productsCat;
}

function upDateProductCategory(newcategory) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    let updatedProducts = products.map((product) => {
        if (product.category === oldcategory) {
            return { ...product, category: newcategory };
        }
        return product;
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
}
