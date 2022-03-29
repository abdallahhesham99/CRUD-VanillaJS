let titleInput = document.getElementById("titleInput");
let priceInput = document.getElementById("priceInput");
let taxesInput = document.getElementById("taxesInput");
let adsInput = document.getElementById("adsInput");
let discountInput = document.getElementById("discountInput");
let totalSpan = document.getElementById("totalSpan");
let countInput = document.getElementById("countInput");
let categoryInput = document.getElementById("categoryInput");
//
let searchInput = document.getElementById("searchInput");
//
let submitButton = document.getElementById("submitButton");
let clearButton = document.getElementById("clearButton");
let deleteAllDiv = document.getElementById("deleteAllDiv");

// Function => getTotal Price of Product
function getTotal() {
  if (priceInput.value != "") {
    let totalResult =
      +priceInput.value +
      +taxesInput.value +
      +adsInput.value -
      +discountInput.value;

    totalSpan.innerHTML = totalResult;
    totalSpan.style.backgroundColor = "#28A745";
  } else {
    totalSpan.innerHTML = ``;
    totalSpan.style.backgroundColor = "#6C757D";
  }
}
// *=============================================================

//empty variable for contain all products data
let productsData;

//if there data in localstorage named productsdata set it in productsData variable
//else make empty array
if (localStorage.getItem("productsData")) {
  productsData = JSON.parse(localStorage.getItem("productsData"));
} else {
  productsData = [];
}
// Function => Create Product
function createProduct() {
  //make product object
  let productObj = {
    title: titleInput.value.toLowerCase(),
    price: priceInput.value,
    taxes: taxesInput.value,
    ads: adsInput.value,
    discount: discountInput.value,
    total: totalSpan.innerHTML,
    count: countInput.value,
    category: categoryInput.value.toLowerCase(),
  };
  //push product in array
  productsData.push(productObj);

  //save in localstorage
  localStorage.setItem("productsData", JSON.stringify(productsData));

  //call clear data in input function
  clearData();

  //call displayProduct function to display new product after create
  displayProduct(productsData);
}
submitButton.addEventListener("click", createProduct);
// *=============================================================

//* =============================================================
// Function => Clear Inputs
function clearData() {
  titleInput.value = "";
  priceInput.value = "";
  taxesInput.value = "";
  adsInput.value = "";
  discountInput.value = "";
  totalSpan.innerHTML = "";
  countInput.value = "";
  categoryInput.value = "";

  //to make styles on totalSpan
  getTotal();
}
clearButton.addEventListener("click", clearData);

//* =============================================================
// Function => Read Products
function displayProduct(arr) {
  let dataTableRow = ``;
  for (let i = 0; i < arr.length; i++) {
    dataTableRow += `
      <tr>
        <td>${i + 1}</td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].taxes}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].count}</td>
        <td>${arr[i].category}</td>
        <td>
            <button id="updateButton">update</button>
        </td>
        <td>
            <button id="deleteButton">delete</button>
        </td>
      </tr>`;
  }
  document.getElementById("tableBody").innerHTML = dataTableRow;
}
displayProduct(productsData);
// *=============================================================
// Function => Delete Product

// Function => Delete All Products

//* =============================================================

// *=============================================================
// Function => Update Product

// *=============================================================
// Function => Search Mood

// Function ===> Search Product

// *=============================================================
//validation
