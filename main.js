let allInputs = document.querySelectorAll(".clr");
let titleInput = document.getElementById("titleInput");
let priceInput = document.getElementById("priceInput");
let taxesInput = document.getElementById("taxesInput");
let adsInput = document.getElementById("adsInput");
let discountInput = document.getElementById("discountInput");
let totalSpan = document.getElementById("totalSpan");
let countInput = document.getElementById("countInput");
let categoryInput = document.getElementById("categoryInput");
let searchInput = document.getElementById("searchInput");
//
let submitButton = document.getElementById("submitButton");
let btnAlert = document.getElementById("btnAlert");
//
let clearButton = document.getElementById("clearButton");
let deleteAllDiv = document.getElementById("deleteAllDiv");
let tableBody = document.getElementById("tableBody");
let noDataDiv = document.querySelector(".noDataDiv");
// ========================================================================

let projectMood = "create";

let searchMood = "title";
//this variable to catch value in function to use it in other function
let globalVar;

// ========================================================================
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
// *==============================================Create func============================================================

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
    title: titleInput.value,
    price: priceInput.value,
    taxes: taxesInput.value,
    ads: adsInput.value,
    discount: discountInput.value,
    total: totalSpan.innerHTML,
    count: countInput.value,
    category: categoryInput.value,
  };
  //push product in array
  if (
    titleInput.value != "" &&
    priceInput.value != "" &&
    countInput.value != "" &&
    categoryInput.value != ""
  ) {
    if (projectMood == "create") {
      productsData.push(productObj);
      //
      btnAlert.classList.replace("d-block", "d-none");
      //call clear data in input function
      clearData();
    } else {
      productsData[globalVar] = productObj;
      projectMood = "create";
      submitButton.innerHTML = "create";
      submitButton.style.backgroundColor = "#b64fc8";
      submitButton.style.color = "#fff";
      //
      btnAlert.classList.replace("d-block", "d-none");
      //call clear data in input function
      clearData();
    }
  } else {
    btnAlert.classList.replace("d-none", "d-block");
  }

  //save in localstorage
  localStorage.setItem("productsData", JSON.stringify(productsData));

  //call displayProduct function to display new product after create
  displayProduct(productsData);
}
submitButton.addEventListener("click", createProduct);
// *==================================================Clear function======================================================

// Function => Clear Inputs
function clearData() {
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].value = "";
  }
  totalSpan.innerHTML = "";

  //to make styles on totalSpan
  getTotal();

  //when user click on update then click on clear
  projectMood = "create";
  submitButton.innerHTML = "create";

  submitButton.style.backgroundColor = "#b64fc8";
  submitButton.style.color = "#fff";
}
clearButton.addEventListener("click", clearData);

//* ==============================================Read Function=========================================================
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
            <button onclick="updateProduct(${i})" id="updateButton">update</button>
        </td>
        <td>
            <button onclick="deleteProduct(${i})" id="deleteButton">delete</button>
        </td>
      </tr>`;
  }
  tableBody.innerHTML = dataTableRow;

  //if there data in array make deleteAll Button and hide No data div
  //else remove delete all button and make No data div Visible
  if (arr.length > 0) {
    deleteAllDiv.innerHTML = `
      <button onclick="deleteAllProducts()">
        delete all (${arr.length})
      </button>`;
    noDataDiv.style.display = "none";
  } else {
    deleteAllDiv.innerHTML = "";
    noDataDiv.style.display = "block";
  }
}
displayProduct(productsData);
// *=============================================Delete Functions====================================================
// Function => Delete Product
function deleteProduct(index) {
  //delete selected index from array
  productsData.splice(index, 1);

  //add new data in localstorage after deleting product
  localStorage.setItem("productsData", JSON.stringify(productsData));

  displayProduct(productsData);

  noDataDiv.innerHTML = `<h2>No data<h2>`;
}
// Function => Delete All Products
function deleteAllProducts() {
  //delete all data in array
  productsData.splice(0);

  //remove localstorage data
  localStorage.clear();

  displayProduct(productsData);

  noDataDiv.innerHTML = `<h2>No data<h2>`;
}
// *===============================================Update Func=============================================================

// Function => Update Product
function updateProduct(index) {
  projectMood = "update";
  globalVar = index;
  titleInput.value = productsData[index].title;
  priceInput.value = productsData[index].price;
  taxesInput.value = productsData[index].taxes;
  adsInput.value = productsData[index].ads;
  discountInput.value = productsData[index].discount;
  getTotal();
  countInput.value = productsData[index].count;
  categoryInput.value = productsData[index].category;

  //some styles when click on update button
  submitButton.innerHTML = "update";
  submitButton.style.backgroundColor = "#E0A800";
  submitButton.style.color = "#000";

  //smooth scroll to top when click on update button
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// *==============================================Search Functions========================================================
// Function => Search Mood
function getSearchMood(elementId) {
  if (elementId == "searchByTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  searchInput.placeholder = `Search by ${searchMood}`;
  searchInput.focus();
  searchInput.value = "";
  displayProduct(productsData);
}
// Function ===> Search Product
function searchProduct(value) {
  let wantedProduct = [];
  for (let i = 0; i < productsData.length; i++) {
    //if user search with title
    if (searchMood == "title") {
      if (productsData[i].title.toLowerCase().includes(value.toLowerCase())) {
        wantedProduct.push(productsData[i]);
      } else {
        //when productsData[i] !== title value in input
      }
      //when use search with category
    } else {
      if (
        productsData[i].category.toLowerCase().includes(value.toLowerCase())
      ) {
        wantedProduct.push(productsData[i]);
      } else {
        //when productsData[i] !== category value in input
      }
    }
    //* ??????????????????????????????????
    if (searchMood == "title") {
      if (productsData[i].title != value) {
        noDataDiv.innerHTML = `<h2>No data similar with ${value}</h2>`;
      } else {
        noDataDiv.innerHTML = `<h2>No data<h2>`;
      }
    } else {
      if (productsData[i].category != value) {
        noDataDiv.innerHTML = `<h2>No data similar with ${value}</h2>`;
      } else {
        noDataDiv.innerHTML = `<h2>No data</h2>`;
      }
    }
    //* ??????????????????????????????????
  }
  displayProduct(wantedProduct);
}

// *===============================================Validation===========================================================
//Function checkInputs values
