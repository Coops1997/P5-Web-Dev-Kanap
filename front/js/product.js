const urlParams = new URLSearchParams(document.location.search);
const titleProduct = document.getElementById('title');
const priceProduct = document.getElementById('price');
const descProduct = document.getElementById('description');
const colorsProduct = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const addButton = document.getElementById('addToCart');


    fetch(urlAPI)
      .then((response) => response.json())
      .then((data) => {
        createProductCardsInfo(data)
        // image
        let img = document.querySelector(".item__img");
        img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        // name
        let name = document.getElementById("title");
        name.innerHTML = data.name;
        // title
        let title = document.querySelector("title");
        title.innerHTML = data.name;
        // price
        let price = document.getElementById("price");
        price.innerHTML = `${data.price}`;
        // description
        let description = document.getElementById("description");
        description.innerHTML = data.description;
        // colors
        let color = document.getElementById("colors");
        for (i = 0; i < data.colors.length; i++) {
          color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
        }
      });
  