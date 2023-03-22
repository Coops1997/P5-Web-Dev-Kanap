// product ID //

let productId = new URL(location.href).searchParams.get("id");

fetch("http://localhost:3000/api/products/" + productId )  
.then((response) => {
  if(response.ok) {
    response.json()
    .then((value) => {
      pageDisplay(value);
    })
  } else {
    console.error('Error');
  }
})
.catch((error) => {
  console.error("Error" + error);
});
      
// Functions //

const pageDisplay = (product) => {  
  let colorsProduct = product.colors;
  Productname = product.name;
  document.querySelector(".item__img").innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.querySelector("#title").innerHTML = `<h1> ${product.name} </h1>`;
  document.querySelector("#price").innerHTML = ` <span id="price">${product.price}</span>`;
  document.querySelector("#description").innerHTML = `<p id="description">${product.description}</p>`;
  
  for (let i in colorsProduct)  {
    document.querySelector("#colors").innerHTML += `
    <option value="${colorsProduct[i]}">${colorsProduct[i]}</option> `;
  }
};

// User functionality + Local Storage//

const button = document.querySelector("#addToCart")
button.addEventListener("click", () => {
  let color = document.querySelector("#colors").value;
  let quantity = document.querySelector("#quantity").value;
  let titleName = Productname ;
  
  if (color === "" || quantity <= 0 || quantity > 100) {
    alert("Please choose a colour and quantity! ")
    return
  }

  // Get product selection details //

  let productOption = {
    id : productId ,
    color : color ,
    quantity : parseInt(quantity) ,
    title : titleName,
  };
    
  let productInlocalStorage = JSON.parse(localStorage.getItem("cart"));
  

  if (productInlocalStorage == null) {

    productInlocalStorage = [];
  }

const foundProduct = productInlocalStorage.find((product) => { 
  return product.color === color && product.id === productId
})

if(foundProduct)
{
  foundProduct.quantity +=parseInt(quantity)
  console.log(quantity);
}

else 
{  
  productInlocalStorage.push(productOption)
}
localStorage.setItem("cart",JSON.stringify(productInlocalStorage));

const popupConfirmation = () => {
  if (window.confirm(` ${productOption.quantity}  ${productOption.title}  has been selected : ${productOption.color} has been added to the cart!` )) {
    window.location.href = "cart.html";
  } else {
     window.location.href = "index.html";
  }
}
popupConfirmation();
})