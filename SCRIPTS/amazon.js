import { addToCart, getCartQuantity } from "./cart.js";

const quantityElements = document.querySelectorAll(".product-quantity");
const addButtons = document.querySelectorAll(".js-add-to-cart");

populateQuantities();
updateCartQuantity();
setupAddButtons();

function populateQuantities() {

  quantityElements.forEach(select => {

    for (let i = 1; i <= 10; i++) {

      const option = document.createElement("option");

      option.value = i;
      option.innerText = i;

      select.appendChild(option);

    }

  });

}

function setupAddButtons() {

  addButtons.forEach(button => {

    button.addEventListener("click", () => {

      const container = button.closest(".product-container");

      const name =
        container.querySelector(".product-name-container").innerText;

      const price =
        container.querySelector(".product-price").innerText;

      const quantity =
        Number(container.querySelector(".product-quantity").value);

      const image =
        container.querySelector(".product-image").src;

      addToCart({
        name,
        price,
        quantity,
        image
      });

      updateCartQuantity();

    });

  });

}

function updateCartQuantity() {

  const element = document.querySelector(".js-cart-quantity");

  if (element) {
    element.innerText = getCartQuantity();
  }

}
