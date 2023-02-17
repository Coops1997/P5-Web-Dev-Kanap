// Get product info
async function getProduct(id) {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    return response.json();
  }
  
  //  Access DOM elements
  const cartProducts = document.getElementById("cart__items");
  const priceTotal = document.getElementById("totalPrice");
  const quantityTotal = document.getElementById("totalQuantity");
  
  // HTML fill
  function fillCartHTML(product) {
    return `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
      <div class="cart__item__img">
        <img src="${product.img}" alt="${product.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.color}</p>
        <p class="item__subtotal">${product.price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Quantity: </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Delete</p>
          </div>
        </div>
      </div>
    </article>`;
  }
  
  // Get existing cart from Local Storage
  function getCartFromLS() {
    const cart = localStorage.getItem("cart");
    if (typeof cart === "string") {
      return JSON.parse(cart) || [];
    }
    return cart || [];
  }
  
  //Populate cart
  function displayCart(products) {
    for (const product of products) {
      cartProducts.innerHTML += fillCartHTML(product);
    }
  
    deleteItem();
    modifyItemQty();
    resetTotal();
  }
  
  
  
  //Delete item
  function deleteItem() {
    let buttons = document.getElementsByClassName("deleteItem");
    console.log("Delete item", buttons);
  
    for (const button of buttons) {
      button.addEventListener("click", function (e) {
        const itemToDelete = e.target.closest(".cart__item");
        console.log(e);
  
        const { color, id } = itemToDelete.dataset;
        itemToDelete.parentNode.removeChild(itemToDelete);
  
        const cart = getCartFromLS();
        const newCart = cart.filter((product) => {
          if (product.color === color && product.id === id) {
            return false;
          }
          return true;
        });
  
        setCartToLS(newCart);
        resetTotal(newCart);
      });
    }
  }
  
  //Modify cart
  
  function modifyItemQty() {
    let qtyHTMLCollect = document.getElementsByClassName("itemQuantity");
    let qtyInputs = Array.from(qtyHTMLCollect);
    let subtotalHTMLCollect = document.getElementsByClassName("item__subtotal");
    let itemSubtotal = Array.from(subtotalHTMLCollect);
      
    qtyInputs.forEach(function(qtyInput){
      // var oldQty = qtyInput.value;
      
      qtyInput.addEventListener("change", function (e) {
        var newQty = qtyInput.value;
        var theCart = getCartFromLS();
        var thisItem = e.target.closest(".cart__item");
        const { id } = thisItem.dataset;
        var theProduct = theCart.find((item)=>
        item.id === id
        )
        var itemPrice = theProduct.price / theProduct.quantity;
        var newSubtotal = (itemPrice * newQty) + "€";
        console.log(newQty);
        console.log(newSubtotal);
        console.log("needs update");
  
        var thisSubtotalEl = thisItem.getElementsByClassName("item__subtotal");
        thisSubtotalEl[0].innerHTML = newSubtotal;
  
        theProduct.quantity = newQty;
        theProduct.price = itemPrice * newQty;
        
        setCartToLS(theCart);
        resetTotal();
        });
      }
    )
  }
  
  // Reset cart total
  function resetTotal() {
    const localCart = getCartFromLS();
    let price = 0;
    let qty = 0;
  
    for (const product of localCart) {
      price += product.price;
      qty += product.quantity;
    }
    priceTotal.textContent = price;
    quantityTotal.textContent = qty;
  }
  
  // Set new cart to Local Storage
  function setCartToLS(cart) {
    if (typeof cart === "string") {
      localStorage.setItem("cart", cart);
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
  
  // Display for empty cart
  let cartContents = getCartFromLS();
  console.log(cartContents);
  if (cartContents.length > 0) {
    displayCart(cartContents);
  } else {
    cartProducts.innerHTML = "<h1> is currently empty.</h1>";
    priceTotal.textContent = "0";
    quantityTotal.textContent = "0";
  }
  
  