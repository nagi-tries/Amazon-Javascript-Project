import { getCart, removeFromCart, clearCart } from "./cart.js";
import { saveOrder } from "./ordersStorage.js";

const cartContainer = document.querySelector(".js-cart-items");

const itemsCountElement = document.querySelector(".js-items-count");
const itemsTotalElement = document.querySelector(".js-items-total");
const beforeTaxElement = document.querySelector(".js-before-tax");
const taxElement = document.querySelector(".js-tax");
const finalTotalElement = document.querySelector(".js-final-total");

const placeOrderButton = document.querySelector(".js-place-order");

renderCart();
setupPlaceOrder();

function renderCart() {

  const cartItems = getCart();

  cartContainer.innerHTML = "";

  let totalItems = 0;
  let itemsTotal = 0;

  cartItems.forEach((item, index) => {

    const price = Number(item.price.replace("$", ""));

    totalItems += item.quantity;
    itemsTotal += price * item.quantity;

    cartContainer.innerHTML += `
      <div class="cart-item">

        <img class="product-image" src="${item.image}">

        <div>
          <h3>${item.name}</h3>
          <p>Price: $${price.toFixed(2)}</p>
          <p>Quantity: ${item.quantity}</p>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>

      </div>
    `;

  });

  const tax = itemsTotal * 0.10;
  const finalTotal = itemsTotal + tax;

  itemsCountElement.innerText = totalItems;
  itemsTotalElement.innerText = itemsTotal.toFixed(2);
  beforeTaxElement.innerText = itemsTotal.toFixed(2);
  taxElement.innerText = tax.toFixed(2);
  finalTotalElement.innerText = finalTotal.toFixed(2);

  setupDeleteButtons();

}

function setupDeleteButtons() {

  document.querySelectorAll(".delete-btn").forEach(btn => {

    btn.addEventListener("click", () => {

      const index = btn.dataset.index;

      removeFromCart(index);

      renderCart();

    });

  });

}

function setupPlaceOrder() {

  placeOrderButton.addEventListener("click", () => {

    const cartItems = getCart();

    if (cartItems.length === 0) return;

    const order = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString(),
      items: [...cartItems],
      total: finalTotalElement.innerText
    };

    saveOrder(order);

    clearCart();

    window.location.href = "orders.html";

  });

}
