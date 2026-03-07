import { getOrders } from "../ordersStorage.js";

const container = document.querySelector('.js-orders-container');

const orders = getOrders();

if (!orders.length) {

  container.innerHTML = "<h3>No orders yet.</h3>";

} else {

  renderOrders();

}

function renderOrders() {

  container.innerHTML = '';

  orders.forEach(order => {

    let itemsHTML = '';

    order.items.forEach(item => {

      const price = Number(item.price.replace('$',''));

      itemsHTML += `
        <div class="order-item">

          <img class="product-image" src="${item.image}">

          <div class="product-info">
            <div>${item.name}</div>
            <div>Price: $${price.toFixed(2)}</div>
            <div>Quantity: ${item.quantity}</div>
          </div>

        </div>
      `;
    });

    container.innerHTML += `
      <div class="order-card">

        <div class="order-header">

          <div>
            ORDER PLACED
            <strong>${order.date}</strong>
          </div>

          <div>
            TOTAL
            <strong>$${order.total}</strong>
          </div>

          <div>
            ORDER ID
            <strong>${order.id}</strong>
          </div>

        </div>

        <div class="order-products">
          ${itemsHTML}
        </div>

      </div>
    `;
  });

}