let cart = [];

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const product = this.parentElement;
    const name = product.getAttribute("data-name");
    const price = parseFloat(product.getAttribute("data-price"));
    const size = product.querySelector(".size").value;

    const item = cart.find((i) => i.name === name && i.size === size);
    if (item) {
      item.quantity++;
    } else {
      cart.push({ name, price, size, quantity: 1 });
    }

    updateCart();
    animateAddToCart(product);
  });
});

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;

    const div = document.createElement("div");
    div.textContent = `${item.name} (${item.size}) - Quantity: ${
      item.quantity
    } - Price: $${(item.price * item.quantity).toFixed(2)}`;
    cartItems.appendChild(div);
  });

  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

function animateAddToCart(product) {
  const animation = document.createElement("div");
  animation.className = "animation";
  animation.textContent = "Added to Cart!";
  product.appendChild(animation);
  setTimeout(() => {
    product.removeChild(animation);
  }, 1000);
}
