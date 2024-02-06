//Global Variables
var userName = document.getElementById("userName");

var prodName = document.getElementById("prodName");
var prodPrice = document.getElementById("prodPrice");
var prodCategory = document.getElementById("prodCategory");
var prodDesc = document.getElementById("prodDesc");

var productsTable = document.getElementById("productsTable");

var searchValue = document.getElementById("searchProd");

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var updateBtn = document.getElementById("updateBtn");
var logOutBtn = document.getElementById("logOutBtn");

var nameRegex = /^(?=.{2,60}$)[A-Z][a-zA-Z\d\W]*(?:\s|\s[a-zA-Z\d\W]*){0,59}$/;
var priceRegex = /^([1-9]\d{0,4}|100000)$/;
var categoryRegex = /^[^\d\s][a-zA-Z\d]*(?:\s|\s[^\d][a-zA-Z\d]*)?$/;

var product;
var productList = [];

if (localStorage.getItem("products") != null) {
    productList = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}

var nameValid;
var priceValid;
var categoryValid;

//EVENTS
prodName.addEventListener("keyup", function () {
    nameValid = nameRegex.test(prodName.value);
    if (!nameValid) {
        prodName.classList.remove("is-valid")
        prodName.classList.add("is-invalid")
        prodNameInvalid.classList.remove("d-none")
    }
    else {
        prodName.classList.remove("is-invalid")
        prodName.classList.add("is-valid")
        prodNameInvalid.classList.add("d-none")
    }
})

prodPrice.addEventListener("keyup", function () {
    priceValid = priceRegex.test(prodPrice.value);
    if (!priceValid) {
        prodPrice.classList.remove("is-valid")
        prodPrice.classList.add("is-invalid")
        prodPriceInvalid.classList.remove("d-none")
    }
    else {
        prodPrice.classList.remove("is-invalid")
        prodPrice.classList.add("is-valid")
        prodPriceInvalid.classList.add("d-none")
    }
})

prodCategory.addEventListener("keyup", function () {
    categoryValid = categoryRegex.test(prodCategory.value);
    if (!categoryValid) {
        prodCategory.classList.remove("is-valid")
        prodCategory.classList.add("is-invalid")
        prodCategoryInvalid.classList.remove("d-none")
    }
    else {
        prodCategory.classList.remove("is-invalid")
        prodCategory.classList.add("is-valid")
        prodCategoryInvalid.classList.add("d-none")
    }
})

function prodValid() {
    prodName.classList.remove("is-valid")
    prodNameInvalid.classList.add("d-none")

    prodPrice.classList.remove("is-valid")
    prodPriceInvalid.classList.add("d-none")

    prodCategory.classList.remove("is-valid")
    prodCategoryInvalid.classList.add("d-none")
}

// adding Func
function addProduct() {
    if (!nameValid || !priceValid || !categoryValid) {
        alert("Enter the info correctlly Before adding a new Product !")
    }
    else {
        prodValid()

        product = {
            name: prodName.value,
            price: prodPrice.value,
            category: prodCategory.value,
            desc: prodDesc.value
        }

        productList.push(product);
        localStorage.setItem("products", JSON.stringify(productList))

        displayProducts()
        clearForm()
    }
}

// Displaing Func
function displayProducts() {
    var container = "";

    for (var i = 0; i < productList.length; i++) {

        container += `
        <tr>
        <td>${i + 1}</td>
        <td>${productList[i].name}</td>
        <td>${productList[i].price} EGP</td>
        <td>${productList[i].category}</td>
        <td>${productList[i].desc}</td>
        <td>
            <button class="btn btn-outline-warning" onclick="updateProducts(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="btn btn-outline-danger" onclick="deleteItem(${i})"><i class="fa-solid fa-trash"></i></button>
    
        </td>
        </tr>`
    }
    productsTable.innerHTML = container;
}

// Clearing form Func
function clearForm() {
    prodName.value = "";
    prodPrice.value = "";
    prodCategory.value = "";
    prodDesc.value = "";
}

// deleting Func
function deleteItem(atIndex) {
    productList.splice(atIndex, 1);
    localStorage.setItem("products", JSON.stringify(productList))
    displayProducts()
}

// Searching Func
function searchProducts() {
    var term = searchValue.value;
    var container = "";

    for (var i = 0; i < productList.length; i++) {

        if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
            container += `
            <tr>
            <td>${i + 1}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price} EGP</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].desc}</td>
            <td>
                <button class="btn btn-outline-warning" onclick="updateProducts(${i})"><i class="fa-regular fa-pen-to-square"></i></button>
                <button class="btn btn-outline-danger" onclick="deleteItem(${i})"><i class="fa-solid fa-trash"></i></button>
        
            </td>
            </tr>`
        }
    }
    productsTable.innerHTML = container;
}


//Update functions with declearing currentProd for the both funcs
var currentProd
function updateProducts(index) {
    addBtn.style.display = "none";
    updateBtn.style.display = "initial";

    currentProd = productList[index];

    prodName.value = currentProd.name;
    prodPrice.value = currentProd.price;
    prodCategory.value = currentProd.category;
    prodDesc.value = currentProd.desc;

}

function setUpdate() {
    nameValid = nameRegex.test(prodName.value);
    priceValid = priceRegex.test(prodPrice.value);
    categoryValid = categoryRegex.test(prodCategory.value);

    if (!nameValid || !priceValid || !categoryValid) {
        alert("Enter the info correctlly Before adding a new Product !")
    }
    else {
        prodValid()

        currentProd.name = prodName.value;
        currentProd.price = prodPrice.value;
        currentProd.category = prodCategory.value;
        currentProd.desc = prodDesc.value;

        addBtn.style.display = "initial";
        updateBtn.style.display = "none";

        localStorage.setItem("products", JSON.stringify(productList))
        displayProducts()
        clearForm()
    }
}

logOutBtn.addEventListener("click", function () {
    localStorage.setItem("is-Logged", "false");
    localStorage.setItem("stay-Logged", "false");
    localStorage.setItem("currentLogin", " ")
    window.location.href = "index.html";
})



