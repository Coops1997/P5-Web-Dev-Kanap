// Get product ID //
const getProductId = () => {
  return new URL(location.href).searchParams.get("id");
};
const productId = getProductId();

//Retrieve from API//

function init() {
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((response) => {
      return response.json();
    })

    .then((product) => {
      productSelection(product);
      productDetails(product);
    })
    .catch((error) => {
      alert(error);
    });
}

// Functions //
let productSelection = (product) => {
  document.querySelector("head > title").textContent = product.name;
  document.querySelector(
    ".item__img"
  ).innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.querySelector("#title").textContent += product.name;
  document.querySelector("#price").textContent += product.price;
  document.querySelector("#description").textContent += product.description;
  const selectedColor = document.querySelector("#colors");

  for (color of product.colors) {
    let option = document.createElement("option");
    option.innerHTML = `${color}`;
    option.value = `${color}`;
    selectedColor.appendChild(option);
  }
};

const productDetails = (product) => {  
  let colorsKanap = product.colors;
  Kanapname = product.name;
  document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.querySelector("#title").innerHTML = `<h1> ${product.name} </h1>`;
  document.querySelector("#price").innerHTML = ` <span id="price">${product.price}</span>`;
  document.querySelector("#description").innerHTML = `<p id="description">${product.description}</p>`;
  
  // Boucle qui parcous les couleurs (i in colorsKanap)
  for (let i in colorsKanap)  {
    document.querySelector("#colors").innerHTML += `
    <option value="${colorsKanap[i]}">${colorsKanap[i]}</option> `;
  }
};

  const button = document.querySelector("#addToCart")
      button.addEventListener("click", () => {
      let selectedColor = document.querySelector("#colors").value;
      let selectedQuantity = document.querySelector("#quantity").value;
      let titleName = Kanapname;
  
      if (selectedColor.value == false) {
        alert("Please select a color");
      } else if (selectedQuantity.value == 0) {
        alert("Please select a quantity");
      } else {
        alert("Added to cart");
      }
  });
 
  let userSelection = {
    id : productId ,
    color : color ,
    quantity : parseInt(quantity) ,
    title : titleName
  };

  let productInlocalStorage = JSON.parse(localStorage.getItem("cart"));

  if (productInlocalStorage == null) {

    productInlocalStorage = [];
  }
  const selectedProduct = productInlocalStorage.find((product) => { 
    return product.color === color && product.id === productId
  })
  
  if(selectedProduct)
  {
    selectedProduct.quantity +=parseInt(quantity)
    console.log(quantity);
  }
  
  else 
  {  
    productInlocalStorage.push(productOption)
  }
  localStorage.setItem("cart",JSON.stringify(productInlocalStorage));

    const popupConfirmation = () => {
  if (window.confirm(`your/you ${productOption.quantity}  ${productOption.title} color : ${productOption.color} Item has been added to cart!` )) {
    window.location.href = "cart.html";
  } else {
     window.location.href = "index.html";
  }
}
popupConfirmation();

init();