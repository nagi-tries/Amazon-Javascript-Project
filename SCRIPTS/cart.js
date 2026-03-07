export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {

  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  saveCart();
}

export function removeFromCart(index) {
  cart.splice(index,1);
  saveCart();
}

export function clearCart() {
  cart = [];
  localStorage.removeItem('cart');
}

export function getCartQuantity() {

  let total = 0;

  cart.forEach(item => {
    total += item.quantity;
  });

  return total;
}