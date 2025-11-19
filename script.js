
let amounts = JSON.parse(localStorage.getItem("amounts")) || {
  "main-dishes": new Array(DISHES["main-dishes"].length).fill(0),
  "side-dishes": new Array(DISHES["side-dishes"].length).fill(0),
};



function getDishCardTemplate(category, index, dish, qty) {
  return `
    <div class="main-dish dish">
      <div>
        <span>${dish.name}</span>
        <p>${dish.description}</p>
        
      </div>
      <div class="button-container"><div class="button-div">
        <button onclick="changeAmount('${category}', ${index}, -1)">-</button>
        <span>${qty}</span>
        <button onclick="changeAmount('${category}', ${index}, 1)">+</button>
        </div>
        <b>${dish.price.toFixed(2)} €</b>
      </div>

    </div>`;
}

function getDishListHTML(category) {
  let html = "";
  const list = DISHES[category];
  for (let i = 0; i < list.length; i++) {
    const dish = list[i];
    const qty = amounts[category][i];
    html += getDishCardTemplate(category, i, dish, qty);
  }
  return html;
}

function render_dishes() {
  document.getElementById("main-dishes").innerHTML =
    getDishListHTML("main-dishes");
  document.getElementById("side-dishes").innerHTML =
    getDishListHTML("side-dishes");
  renderCart();
}

function changeAmount(category, index, delta) {
  amounts[category][index] = Math.max(0, amounts[category][index] + delta);
  localStorage.setItem("amounts", JSON.stringify(amounts));
  render_dishes();
}



function collectCartItems(category, items) {
  let subtotal = 0;
  const list = DISHES[category];
  for (let i = 0; i < list.length; i++) {
    const quantity = amounts[category][i];
    if (!quantity) continue;
    const dish = list[i];
    const lineTotal = quantity * dish.price;
    subtotal += lineTotal;
    items.push({ category, index: i, quantity, dish, lineTotal });
  }
  return subtotal;
}

function getCartState() {
  const items = [];
  let total = 0;
  total += collectCartItems("main-dishes", items);
  total += collectCartItems("side-dishes", items);
  const hasItems = items.length > 0;
  const needsDelivery = hasItems && total < 50;
  if (needsDelivery) total += 5;
  return { items, total, hasItems, needsDelivery };
}





function renderCart() {
  const cart = document.getElementById("cart");
  if (!cart) return;
  const state = getCartState();
  cart.innerHTML = getCartTemplate(state);

  if (state.hasItems) {
    cart.classList.add("visible");
    document.body.classList.add("cart-open");
  } else {
    cart.classList.remove("visible");
    document.body.classList.remove("cart-open");
  }

  const icon = document.getElementById("cart-icon");
  if (!icon) return;
  icon.style.display = cart.classList.contains("visible")
    ? "none"
    : state.hasItems ? "block" : "none";
}

function startOrder() {
  const box = document.getElementById("order-confirmation");
  if (!box) return;
  box.textContent = "Danke! Deine Bestellung wurde übermittelt.";
  box.className = "order-confirmation success";
}

function clearCart() {
  amounts = {
    "main-dishes": new Array(DISHES["main-dishes"].length).fill(0),
    "side-dishes": new Array(DISHES["side-dishes"].length).fill(0),
  };
  localStorage.setItem("amounts", JSON.stringify(amounts));
  render_dishes();
  closeCart();
}

function openCart() {
  const cart = document.getElementById("cart");
  const icon = document.getElementById("cart-icon");
  cart.classList.add("visible");
  document.body.classList.add("cart-open");
  if (icon) icon.style.display = "none";
}

function closeCart() {
  const cart = document.getElementById("cart");
  const icon = document.getElementById("cart-icon");
  cart.classList.remove("visible");
  document.body.classList.remove("cart-open");
  const hasItems =
    amounts["main-dishes"].some(q => q > 0) ||
    amounts["side-dishes"].some(q => q > 0);
  if (icon) icon.style.display = hasItems ? "flex" : "none";
}

function setActiveMealNav(id) {
  const link1 = document.getElementById("meal-link-1");
  const link2 = document.getElementById("meal-link-2");
  if (id === 1) {
    link1.classList.add("active");
    link2.classList.remove("active");
  } else {
    link2.classList.add("active");
    link1.classList.remove("active");
  }
}
