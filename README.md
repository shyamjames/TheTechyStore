# Online Shopping Website

A fully functional responsive web application for an online shopping site using Bootstrap 5, Material Design, and JavaScript with LocalStorage.

## 🚀 Features

- **Responsive Design**: Built with Bootstrap 5 and custom CSS for a premium "Samsung-like" aesthetic.
- **Authentication**: User Registration and Login system using LocalStorage.
- **Product Management**: Admin panel to Add, Edit, and Delete products.
- **Shopping Cart**: Add items, update quantities, and remove items.
- **Data Persistence**: All data (Users, Products, Cart) is stored in the browser's LocalStorage.

## 🛠️ Technologies Used

- **HTML5**: Semantic structure.
- **CSS3**: Custom styling + Bootstrap 5.
- **JavaScript (ES6+)**: Logic for Auth, CRUD, and DOM manipulation.
- **LocalStorage**: Client-side database.
- **Google Fonts**: 'Inter' font for modern typography.

## 📂 Project Structure

- `index.html`: Home page with hero banner and featured categories.
- `shop.html`: Product listing page with Admin controls.
- `cart.html`: Shopping cart page.
- `login.html`: User login page.
- `register.html`: User registration page.
- `admin.html`: Admin page for adding/editing products.
- `style.css`: Global styles and theme overrides.
- `script.js`: Core logic for the application.

## 🔑 Login Credentials

### Admin User
- **Email**: `admin@gmail.com`
- **Password**: `admin123`

### Regular User
- **Email**: `john@gmail.com`
- **Password**: `123456`

## 📖 How to Use

1. **Open `index.html`** in your browser.
2. **Login** using the credentials above or **Register** a new account.
3. **Browse Products** on the Shop page.
4. **Add to Cart** and manage your items in the Cart page.
5. **Admin Features**: Login as Admin to see "Edit" and "Delete" buttons on products, and access the "Add Product" page via the Navbar or Floating Action Button on the Shop page.

## 🎨 Design Decisions

- **Theme**: Minimalist Black & White theme inspired by Samsung's design language.
- **Components**: Material Design cards with hover effects, custom rounded buttons, and clean form inputs.
- **Feedback**: Custom Snackbar notifications for user actions (Login success, Add to cart, etc.).
