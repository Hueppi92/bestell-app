let amounts = JSON.parse(localStorage.getItem("amounts")) || {
  "main-dishes": new Array(DISHES["main-dishes"].length).fill(0),
  "side-dishes": new Array(DISHES["side-dishes"].length).fill(0),
};

function render_dishes() {
  const dishContainer = document.getElementById("main-dishes");
  const sidedishContainer = document.getElementById("side-dishes");

  dishContainer.innerHTML = "";
  sidedishContainer.innerHTML = "";

  for (let i = 0; i < DISHES["main-dishes"].length; i++) {
    const dish = DISHES["main-dishes"][i];

    dishContainer.innerHTML += `
      <div class="main-dish dish">
        <div>
          <span>${dish.name}</span> 
          <p>${dish.description}</p>
          <p>${dish.price.toFixed(2)} €</p>
        </div> 
        <div class="button-container">
          <button onclick="changeAmount('main-dishes', ${i}, -1)">-</button>
          <span>${amounts["main-dishes"][i]}</span>
          <button onclick="changeAmount('main-dishes', ${i}, 1)">+</button>
        </div>
      </div>`;
  }

  for (let i = 0; i < DISHES["side-dishes"].length; i++) {
    const dish = DISHES["side-dishes"][i];

    sidedishContainer.innerHTML += `
      <div class="main-dish dish">
        <div>
          <span>${dish.name}</span> 
          <p>${dish.description}</p>
          <p>${dish.price.toFixed(2)} €</p>
        </div>
        <div class="button-container">
          <button onclick="changeAmount('side-dishes', ${i}, -1)">-</button>
          <span>${amounts["side-dishes"][i]}</span>
          <button onclick="changeAmount('side-dishes', ${i}, 1)">+</button>
        </div>
      </div>`;
  }

  renderCart();
}

function changeAmount(category, index, delta) {
  amounts[category][index] = Math.max(0, amounts[category][index] + delta);

  localStorage.setItem("amounts", JSON.stringify(amounts));

  render_dishes();
}

function renderCart() {
  const cart = document.getElementById("cart");
  if (!cart) return;

  let html = `
    <h2>Warenkorb 
      <button onclick="closeCart()" class="close-cart-button">✖</button>
    </h2>
  `;

  let total = 0;
  let hasItems = false;

  html += `<div class="cart-items">`;

  for (let i = 0; i < DISHES["main-dishes"].length; i++) {
    const quantity = amounts["main-dishes"][i];
    if (quantity > 0) {
      hasItems = true;
      const dish = DISHES["main-dishes"][i];
      const subtotal = quantity * dish.price;
      total += subtotal;

      html += `
        <div class="cart-item">
          <div class="cart-item-left">
            <button class="cart-button" onclick="changeAmount('main-dishes', ${i}, -1)">-</button>
            <span>${quantity}</span>
            <button class="cart-button" onclick="changeAmount('main-dishes', ${i}, 1)">+</button>
            <span class="cart-item-name">${dish.name}</span>
          </div>
          <div class="cart-item-right">
            <span>${subtotal.toFixed(2)} €</span>
          </div>
        </div>
      `;
    }
  }

  for (let i = 0; i < DISHES["side-dishes"].length; i++) {
    const quantity = amounts["side-dishes"][i];
    if (quantity > 0) {
      hasItems = true;
      const dish = DISHES["side-dishes"][i];
      const subtotal = quantity * dish.price;
      total += subtotal;

      html += `
        <div class="cart-item">
          <div class="cart-item-left">
            <button class="cart-button" onclick="changeAmount('side-dishes', ${i}, -1)">-</button>
            <span>${quantity}</span>
            <button class="cart-button" onclick="changeAmount('side-dishes', ${i}, 1)">+</button>
            <span class="cart-item-name">${dish.name}</span>
          </div>
          <div class="cart-item-right">
            <span>${subtotal.toFixed(2)} €</span>
          </div>
        </div>
      `;
    }
  }

  html += `</div>`;

  if (total < 50 && hasItems) {
    html += `
      <div class="cart-total">
        <span>Lieferkosten <p>(gratis ab 50€ Warenwert)</p></span>
        <span>5,00 €</span>
      </div>`;
    total += 5;
  }

  if (!hasItems) {
    html += `<p>Dein Warenkorb ist leer.</p>`;
  } else {
    html += `
  <div class="cart-total">
    <span>Gesamt</span>
    <span>${total.toFixed(2)} €</span>
  </div>

  <button class="order-button" onclick="startOrder()">
    Jetzt bestellen
  </button>

  <button class="clear-cart-button" onclick="clearCart()">
    🗑 Warenkorb leeren
  </button>
`;
  }

  cart.innerHTML = html;

if (hasItems) {
    cart.classList.add("visible");
    document.body.classList.add("cart-open");
} else {
    cart.classList.remove("visible");
    document.body.classList.remove("cart-open");
}


const icon = document.getElementById("cart-icon");
if (cart.classList.contains("visible")) {
    icon.style.display = "none";
} else {
    icon.style.display = hasItems ? "block" : "none";
}

}
function startOrder() {
  alert("Bestellung wurde ausgelöst! ");
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

    icon.style.display = "none"; 
}



function closeCart() {
    const cart = document.getElementById("cart");
    const icon = document.getElementById("cart-icon");

    cart.classList.remove("visible");
    document.body.classList.remove("cart-open");

    const hasItems =
      amounts["main-dishes"].some(q => q > 0) ||
      amounts["side-dishes"].some(q => q > 0);

  
    icon.style.display = hasItems ? "flex" : "none";
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
