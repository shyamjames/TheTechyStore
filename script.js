/**
 * Online Shopping Website - Core Logic
 */

// --- Constants ---
const USERS_KEY = 'users';
const LOGGED_IN_USER_KEY = 'loggedInUser';
const PRODUCTS_KEY = 'products';
const CART_KEY = 'cart';

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    updateNavbar();
    updateCartCount();
});

function initializeData() {
    // Initialize Users if empty
    if (!localStorage.getItem(USERS_KEY)) {
        const defaultUsers = [
            { id: 1, name: "John Doe", email: "john@gmail.com", password: "123456", isAdmin: false },
            { id: 2, name: "Admin", email: "admin@gmail.com", password: "admin123", isAdmin: true }
        ];
        localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
    }

    // Initialize Products if empty
    if (!localStorage.getItem(PRODUCTS_KEY)) {
        const defaultProducts = [
            {
                id: 1,
                name: "Galaxy S25 Ultra",
                price: 129999,
                description: "The latest AI-powered flagship with titanium frame and Snapdragon 8 Gen 4.",
                image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s928-sm-s928bztqins-539573349?$650_519_PNG$"
            }
        ];
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultProducts));
    }

    // Initialize Cart if empty
    if (!localStorage.getItem(CART_KEY)) {
        localStorage.setItem(CART_KEY, JSON.stringify([]));
    }
}

// --- Authentication ---

function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));

    if (users.find(u => u.email === email)) {
        showSnackbar("Email already exists!");
        return false;
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        isAdmin: false
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    showSnackbar("Registration successful! Please login.");
    return true;
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
        return true;
    }
    return false;
}

function logoutUser() {
    localStorage.removeItem(LOGGED_IN_USER_KEY);
    window.location.href = 'login.html';
}

function getCurrentUser() {
    const userStr = localStorage.getItem(LOGGED_IN_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
}

function requireAuth() {
    if (!getCurrentUser()) {
        window.location.href = 'login.html';
    }
}

function requireAdmin() {
    const user = getCurrentUser();
    if (!user || !user.isAdmin) {
        showSnackbar("Access denied. Admins only.");
        setTimeout(() => window.location.href = 'index.html', 1000);
        return false;
    }
    return true;
}

// --- UI Helpers ---

function updateNavbar() {
    const user = getCurrentUser();
    const navLinks = document.getElementById('nav-links');
    const authLinks = document.getElementById('auth-links');

    if (!navLinks || !authLinks) return;

    if (user) {
        // Logged in
        let linksHtml = `
            <li class="nav-item"><a class="nav-link text-white" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="shop.html">Shop</a></li>
            <li class="nav-item"><a class="nav-link text-white" href="cart.html">Cart <span id="cart-badge" class="badge bg-light text-dark rounded-pill">0</span></a></li>
        `;

        if (user.isAdmin) {
            linksHtml += `<li class="nav-item"><a class="nav-link text-white" href="admin.html">Add Product</a></li>`;
        }

        navLinks.innerHTML = linksHtml;
        authLinks.innerHTML = `
            <li class="nav-item d-flex align-items-center me-3">
                <span class="text-white small">Hello, ${user.name}</span>
            </li>
            <li class="nav-item">
                <button class="btn btn-outline-light btn-sm" onclick="logoutUser()">Logout</button>
            </li>
        `;
    } else {
        // Not logged in
        navLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link text-white" href="index.html">Home</a></li>
        `;
        authLinks.innerHTML = `
            <li class="nav-item"><a class="nav-link text-white" href="login.html">Login</a></li>
            <li class="nav-item"><a class="btn btn-light text-dark btn-sm ms-2 rounded-pill px-3" href="register.html">Register</a></li>
        `;
    }
}

function showSnackbar(message) {
    let snackbar = document.getElementById("snackbar");
    if (!snackbar) {
        snackbar = document.createElement("div");
        snackbar.id = "snackbar";
        // Bootstrap classes for fixed bottom toast-like appearance
        snackbar.className = "position-fixed bottom-0 start-50 translate-middle-x mb-4 p-3 bg-dark text-white rounded shadow-lg";
        snackbar.style.zIndex = "1050";
        snackbar.style.minWidth = "300px";
        snackbar.style.textAlign = "center";
        snackbar.style.display = "none";
        document.body.appendChild(snackbar);
    }
    snackbar.textContent = message;
    snackbar.style.display = "block";

    // Simple fade out effect
    setTimeout(function () {
        snackbar.style.display = "none";
    }, 3000);
}

// --- Cart Logic ---

function addToCart(productId) {
    if (!getCurrentUser()) {
        showSnackbar("Please login to add items to cart");
        setTimeout(() => window.location.href = 'login.html', 1000);
        return;
    }

    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
    const product = products.find(p => p.id == productId);

    if (!product) return;

    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const existingItem = cart.find(item => item.id == productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
    showSnackbar("Added to cart!");
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}
