const products = [
  { id: 1, name: "Laptop", price: 10000, category: "electronics" },
  { id: 2, name: "T-shirt", price: 200, category: "clothes" },
];
function displayProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(product => {
    container.innerHTML += `
      <div>
        <h3>${product.name}</h3>
        <p>${product.price} EGP</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

displayProducts(products);
let cart = [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  renderCart();
}

function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  cart.forEach(item => {
    cartDiv.innerHTML += `<p>${item.name} - ${item.price}</p>`;
  });
}
document.getElementById("categoryFilter").addEventListener("change", function () {
  const value = this.value;

  if (value === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === value);
    displayProducts(filtered);
  }
});
let products = [];

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  products = await res.json();
  displayProducts(products);
}

getProducts();
function displayProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" width="100%">
        <h3>${p.title}</h3>
        <p>${p.price} $</p>
        <button onclick="addToCart(${p.id})">Add</button>
      </div>
    `;
  });
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
}

function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
function renderCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    cartDiv.innerHTML += `
      <div>
        ${item.title} - ${item.qty}
        <button onclick="increase(${item.id})">+</button>
        <button onclick="decrease(${item.id})">-</button>
        <button onclick="removeItem(${item.id})">❌</button>
      </div>
    `;
  });

  cartDiv.innerHTML += `<h3>Total: ${total.toFixed(2)} $</h3>`;
}
function increase(id) {
  const item = cart.find(p => p.id === id);
  item.qty++;
  updateCart();
}

function decrease(id) {
  const item = cart.find(p => p.id === id);
  item.qty--;

  if (item.qty === 0) {
    cart = cart.filter(p => p.id !== id);
  }

  updateCart();
}

function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  updateCart();
}

renderCart();
function filterCategory(category) {
  if (category === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}
function toggleDark() {
  document.body.classList.toggle("dark");
}
