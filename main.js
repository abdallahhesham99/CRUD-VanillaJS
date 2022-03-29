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

//if there data in localstorage named productsdata set it in productData variable
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
  productsData.push(productObj);

  localStorage.setItem("productsData", JSON.stringify(productsData));

  console.log(productsData);
  clearData();
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
