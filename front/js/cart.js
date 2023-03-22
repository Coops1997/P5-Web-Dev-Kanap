let KanapAPI = "http://localhost:3000/api/products/";

const totalPrice = document.querySelector("#totalPrice");
const cartItems = document.querySelector("#cart__items");
const order = document.querySelector("#order");
const totalQuantity = document.querySelector("#totalQuantity");
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const products = [];

// Get product info //

const displayProduct = (product) => {
  let productId = product.id ;
  let productColor = product.color;
  let productQuantity = product.quantity;
  
    fetch(KanapAPI + productId)
      .then((res) => res.json())
      .then((product) => {
        products.push(product);
        totalCalcul();

        //create new articles + html fill//

        let quantity = parseInt(productQuantity);
        const newArticle = document.createElement("article");
        newArticle.setAttribute("class", "cart__item");
        newArticle.setAttribute("data-id", product._id);
        newArticle.setAttribute("data-color", productColor);
        newArticle.innerHTML = `
          <div class ="cart__item__img"> 
          <img src="${product.imageUrl}" alt=${product.altText}>
          </div>
          <div class="cart__item__content">
          <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${productColor}</p>
          <p>${product.price} €</p>
          </div>
          <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number"  class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Delete</p>
          </div>
          </div>
          </div>
          </article>`;
          cartItems.appendChild(newArticle);
          const deleteBtn = document.querySelector(
          `[data-id="${productId}"][data-color="${productColor}"] .deleteItem`
        );
        const changeBtn = document.querySelector(
          `[data-id="${productId}"][data-color="${productColor}"] .itemQuantity`
        );
// quantity button//
        changeBtn.addEventListener("change", (e) => {
          changeQuantity(productId, productColor, e.target.value);
          
        });
// delete button //
        deleteBtn.addEventListener("click", () => {
          deleteItem(productId, productColor);
        });
      })
      .catch((error) => console.log(error))
  };
  // update changes in cart//
const changeQuantity = (id, color, value) => {
  const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];

  let item = updatedCart.find((i) => i.id === id && i.color === color);

  let index = updatedCart.indexOf(item);
  
  item.quantity = parseInt(value);
  updatedCart[index] = item;

  localStorage.setItem("cart", JSON.stringify(updatedCart));
  totalCalcul();
};

const deleteItem = (productId, color) => {
  const carts = JSON.parse(localStorage.getItem("cart")) || [];
  let product = carts.find((i) => i.id == productId && i.color === color);

  let ItemDom = document.querySelector(
    `[data-id="${productId}"][data-color="${color}"]`
  );

  const index = carts.indexOf(product);
  if (index > -1) {
    carts.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(carts));

  cartItems.removeChild(ItemDom);

  totalCalcul();
};
// updated cart + calculations //
const totalCalcul = () => {
  const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;
  let totalQuantityNumber = parseInt(0);
  
  for (let item of updatedCart) {
    let findProd = products.find((i) => i._id === item.id);
    if (findProd) {
      let price = findProd.price * item.quantity;
      total += price;
      totalQuantityNumber += parseInt(item.quantity);
    }
    if (totalQuantityNumber <= 0 || total <= 0 ) {
      alert("Choose a quantity! :) ")
      return
    }
  }

  totalPrice.textContent = total;
  totalQuantity.textContent = totalQuantityNumber;
  
};
const start = () => {
  for (let item of cart) {
    displayProduct(item);
  }
  
  order.addEventListener("click", (e) => {
    e.preventDefault();
    command();
  });
};
// validation forms
const allRegex = [
  {
    name: "firstName",
    regex: /^[A-Za-z-]+$/,
    error: "Please fill out all the information required! :)",
    validate: "firstname √",
  },
  {
    name: "lastName",
    regex: /^[A-Za-z-]+$/,
    error: "Please fill out all the information required! :)",
    validate: "lastname √",
  },
  {
    name: "address",
    regex: /^[0-9]+\s[0-9A-Za-zÀ-ü-'\s]+$/,
    error: "Please fill out all the information required! :)",
    validate: "Address √",
  },
  {
    name: "city",
    regex: /^[A-Za-zÀ-ü-'\s]+$/,
    error: "Please fill out all the information required! :)",
    validate: "City √",
  },
  {
    name: "email",
    regex: /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/,
    error: "Please fill out all the information required! :)",
    validate: "Email √",
  },
];

const checkInputs = () => {
  let datas = {};
  let validForm = true;

  for (let field of allRegex) {
    let fieldInput = document.querySelector(`#${field.name}`);
    let inputValue = fieldInput.value;

    fieldInput.addEventListener("change", (e) => {

      if (!field.regex.test(e.target.value)) {

        fieldInput.nextElementSibling.textContent = field.error;
      } else {
        fieldInput.nextElementSibling.textContent = field.validate;
      }
    });

    if (!field.regex.test(inputValue)) {

      fieldInput.nextElementSibling.textContent = field.error;
      validForm = false;
    }
    datas[field.name] = inputValue;
  }

  if (validForm) {
    return datas;
  } else {
    return false;
  }
};

const command = () => {
  let data = checkInputs();
  if (!data) {
    alert("Please complete the form!:)");

    return;
  }

  let products = JSON.parse(localStorage.getItem("cart")) || [];
  let productData = [];
  if (!products[0]) {
    alert("Your basket is empty!");
    return;
  }

  for (let product of products) {
    for (let index = 0; index < product.quantity; index++) {
      productData.push(product.id);
    }
  }

  fetch(KanapAPI + "order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: {
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        address: data.address,
        email: data.email,
      },
      products: productData,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.removeItem("cart");
      window.location.replace("confirmation.html?orderId=" + data.orderId);
    })
    .catch((error) => {
    console.error("Error:", error);
    });
};
window.addEventListener("load", start);