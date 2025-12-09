# Keurig E-Commerce Website

# https://in-info-web4.luddy.indianapolis.iu.edu/~kytruong/final-315/dist/

A modern, responsive e-commerce website for Keurig coffee makers built with Vite, jQuery, Firebase, and SCSS.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [File Descriptions](#file-descriptions)

## Features

- **Product Catalog**: Display coffee makers with banners, images, names, prices, and descriptions
- **Shopping Cart**: Add/remove items, view cart count badge, empty cart functionality
- **User Authentication**: Email/password signup and login via Firebase
- **SweetAlert Notifications**: User-friendly alerts for actions and errors
- **Responsive Design**: Mobile-friendly layout with flexbox styling
- **Relative Paths**: Works with any deployment structure (root or subdirectory)

## Project Structure

```
keurig/
├── public/              # Static assets (copied to dist)
│   ├── data.json       # Product data
│   └── images/         # Product images (product1-10.png, footer, logo variants)
├── src/                # Source code
│   ├── main.js         # Firebase init & auth event listeners
│   ├── model.js        # Product loading, routing, cart management
│   └── index.js        # Entry point
├── pages/              # HTML pages (loaded dynamically)
│   ├── account.html    # Login page
│   ├── cart.html       # Shopping cart page
│   └── create.html     # Signup page
├── scss/               # SCSS stylesheets
│   ├── styles.scss     # Main styles
│   ├── nav.scss        # Navigation styling
│   ├── account.scss    # Account page styles
│   ├── cart.scss       # Cart page styles
│   └── structures.scss # Structural components
├── css/                # Compiled CSS (generated)
├── dist/               # Production build (generated)
├── data/               # Source data file
├── index.html          # Main HTML entry
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
└── webpack.config.js   # (Legacy, not used)
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kyratruong/keurig.git
   cd keurig
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Start Development Server

```bash
npm run dev
```

Runs Vite dev server at `http://localhost:5174`

### Watch SCSS Files

```bash
npm run compile
```

Compiles `scss/styles.scss` to `css/styles.css` in watch mode

### Run Both Simultaneously

Open two terminal tabs:

- Terminal 1: `npm run dev`
- Terminal 2: `npm run compile`

## Building for Production

```bash
npm run build
```

This creates an optimized `dist/` folder with:

- Minified HTML, CSS, and JavaScript
- Asset optimization
- Relative paths for subfolder deployments

## Deployment

### Via Cyberduck or FTP

Upload the **entire contents** of the `dist/` folder to your web server:

1. Connect to your server via Cyberduck/FTP
2. Upload all files from `dist/`:

   - `index.html`
   - `data.json`
   - `assets/` folder (CSS, JS bundles)
   - `images/` folder (product images)

3. Access your site at `https://yourdomain.com` (or subdirectory if deployed there)

### Important Notes

- **Relative Paths**: All asset and data paths are relative (`./assets/...`, `data.json`, `images/...`) so the app works whether hosted at root or in a subdirectory
- **data.json**: Must be at the same level as `index.html` for product loading to work
- **images/ folder**: Must be at the same level as `index.html` for product images to display
- **Cache**: Hard refresh (`Ctrl+Shift+R` or `Cmd+Shift+R`) after deployment to clear old cached files

## Technologies Used

### Frontend Framework

- **Vite 7.2.4**: Modern bundler and dev server with ES modules support
- **jQuery 3.7.1**: DOM manipulation and AJAX requests
- **SweetAlert2 11.26.4**: User notifications and alerts

### Styling

- **Sass 1.94.2**: CSS preprocessing with variables, mixins, nesting

### Backend & Authentication

- **Firebase 12.6.0**: Real-time authentication, user management, analytics

### Configuration

- **package.json**: Specifies `"type": "module"` for ES module imports
- **vite.config.js**: Sets `base: "./"` for relative asset paths in production

## File Descriptions

### `src/main.js`

Entry point that:

- Initializes Firebase with config credentials
- Imports SweetAlert2, jQuery, auth functions, and model.js
- Attaches event delegation listeners for signup/login buttons
- Calls `initURLListener()` from model.js to initialize routing

### `src/model.js`

Core application logic:

- `loadProducts()`: Fetches `data.json` via AJAX, populates products array
- `loadHomePage()`: Renders product cards with banners, images, names, prices, descriptions
- `changeRoute()`: Responds to URL hash changes (`#cart`, `#account`, `#create`)
- `loadCartItems()`: Displays cart contents, handles item removal
- `addBuyNowListener()`: Attaches click handlers to "Buy Now" buttons
- `initURLListener()`: Exported function that sets up hash change listener

### `public/data.json`

Product catalog with 10 items:

```json
{
  "PRODUCTS": [
    {
      "productBanner": "Banner text",
      "productBannerColor": "#color",
      "productImage": "images/product1.png",
      "productName": "",
      "productPrice": "",
      "productDescription": ""
    },
    ...
  ]
}
```

### `index.html`

Main template with:

- Navigation bar with logo, search, account/cart/support icons
- `#app` div for dynamic content injection
- Single script tag: `<script type="module" src="./assets/index-*.js"></script>`
- Footer with image and styling

### `pages/cart.html`

Shopping cart page with:

- "Remove All" button to clear cart and show confirmation
- `.cart-items` div for product list
- Trash icon SVG for individual item removal
- Cart count badge display

### `pages/account.html`

Login page with:

- Email and password inputs
- Login button with ID `#login-btn`
- Firebase authentication via `main.js`
- Link to signup page

### `pages/create.html`

Signup page with:

- Email, password, confirm password inputs
- Signup button with ID `#signup-btn`
- Firebase authentication via `main.js`
- Link to login page

### SCSS Files

- **styles.scss**: Root imports and variables
- **nav.scss**: Navigation styling, logo, search, icons
- **account.scss**: Login form styling
- **cart.scss**: Cart page layout and product list
- **structures.scss**: Product cards, banners, buttons

## Key Implementation Details

### Relative Paths

- Asset references in CSS: `url(../images/...)`
- Data loading in model.js: `$.getJSON("data.json", ...)`
- Page loading in model.js: `$.get("pages/cart.html", ...)`
- Vite config base: `base: "./"`

### Event Delegation

Auth buttons use jQuery event delegation because pages load dynamically:

```javascript
$(document).on("click", "#login-btn", function() { ... })
$(document).on("click", "#signup-btn", function() { ... })
```

### Product Rendering

Products are fetched from `data.json` and rendered dynamically with template literals:

```javascript
let productHTML = `<div class="product">
  <img src="${product.productImage}" alt="">
  <div class="productName">${product.productName}</div>
  ...
</div>`;
$("#app").append(productHTML);
```

### Cart Management

- Cart stored in array: `cart = [productIndex1, productIndex2, ...]`
- Badge updated on add: `$(".item-text").html(cart.length)`
- Items removed by index with `splice()`
- Cart persists during session (lost on refresh)

## Common Issues & Solutions

### Products Not Displaying

- Verify `data.json` is in `public/` folder
- Check browser console for AJAX errors (F12)
- Ensure image paths use relative format: `images/productN.png`

### Cart Page Not Loading

- Verify `pages/cart.html` exists
- Check that model.js uses relative path: `pages/${pageID}.html`
- Rebuild with `npm run build`

### Images Not Showing

- Verify `images/` folder exists at dist root level
- Check image filenames match `data.json` paths
- Use relative paths: `images/product1.png` (not `/images/...`)

### Auth Buttons Not Working

- Verify event delegation syntax in `main.js`
- Check Firebase credentials are correct
- Open console (F12) to see error messages

## Deployment URLs

Live deployments:

- https://in-info-web4.luddy.indianapolis.iu.edu/~kytruong/dist/
- https://in-info-web4.luddy.indianapolis.iu.edu/~kytruong/keurig/

## Future Enhancements

- Add product filtering and search
- Implement wishlist functionality
- Add checkout/payment processing
- Persistent cart storage (localStorage/database)
- Product detail pages
- User profile management
- Order history tracking

## License

MIT License - See LICENSE file for details

## Author

Created for Advanced Frontend Development (ADV FE-315)
