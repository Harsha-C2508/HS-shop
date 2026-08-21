# Harsha's Collection

A full-stack e-commerce application built with React and Node.js, featuring a product catalog across multiple categories, user authentication, cart & wishlist management, coupon support, order tracking, and real payments via Razorpay.

## Tech Stack

**Frontend:** React 18, Redux, Chakra UI, React Router, Axios

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT Authentication

**Payments:** Razorpay (UPI, Cards, Net Banking, Wallets) + Cash on Delivery

**Images:** Stored in MongoDB (no external file storage needed)

## Features

- **Product Catalog** — Browse products across categories (Men, Women, Footwear, Accessories, Home Decor, Paintings) with filtering and sorting
- **Search** — Search products by name or category
- **Authentication** — User registration, login, and admin access with JWT
- **Cart & Wishlist** — Add/remove items, update quantities, move between cart and wishlist
- **Checkout** — Multi-step checkout with address form, pincode auto-fill (Indian postal API), and saved default addresses
- **Payments** — Real payment processing via Razorpay (UPI, cards, net banking, wallets) or Cash on Delivery
- **Order Tracking** — View order history with status updates
- **Coupons** — Apply discount codes at checkout
- **Reviews** — Product review system
- **Admin Panel** — Manage products (add, edit, delete), view customer orders, update order status
- **Recently Viewed** — Tracks and displays recently viewed products
- **Responsive Design** — Works on desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (Atlas or local via Docker)

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd HS-shop

# Frontend dependencies
npm install

# Backend dependencies
npm install --prefix server
```

### 2. Configure environment variables

Copy the example env files and fill in your values:

```bash
# Frontend (root .env)
cp .env.example .env

# Backend (server/.env) — already has defaults for local development
```

**Server environment variables** (`server/.env`):

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | Atlas URI |
| `JWT_SECRET` | Secret for signing JWT tokens | dev placeholder |
| `ADMIN_EMAIL` | Admin login email | `admin@hsshop.com` |
| `ADMIN_PASSWORD` | Admin login password | `ChangeMe123!` |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID (from [dashboard](https://dashboard.razorpay.com)) | — |
| `RAZORPAY_KEY_SECRET` | Razorpay API Key Secret | — |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |

### 3. Set up Razorpay (for online payments)

1. Create a free account at [dashboard.razorpay.com](https://dashboard.razorpay.com)
2. Enable **Test Mode** (toggle in sidebar)
3. Go to **Account & Settings > API Keys > Generate Key**
4. Add the keys to `server/.env`:
   ```
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   ```

Without Razorpay keys, Cash on Delivery still works.

### 4. Start the application

```bash
# Terminal 1 — Backend (auto-seeds products + admin on first run)
npm run dev --prefix server

# Terminal 2 — Frontend
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000) with the backend API at [http://localhost:5000](http://localhost:5000).

### Optional: Local MongoDB via Docker

If you don't have MongoDB Atlas, run a local instance:

```bash
docker compose up -d
```

Then set `MONGODB_URI=mongodb://127.0.0.1:27017/hsshop` in `server/.env`.

## Project Structure

```
HS-shop/
├── public/                  # Static assets
├── server/
│   └── src/
│       ├── config/          # Database connection
│       ├── data/            # Product catalog & image data
│       ├── middleware/       # Auth middleware (JWT)
│       ├── models/          # Mongoose schemas (User, Product, Order, Cart, etc.)
│       ├── routes/          # API routes (auth, products, cart, orders, payments, etc.)
│       ├── index.js         # Express server entry point
│       └── seed.js          # Database seeding script
├── src/
│   ├── api/                 # Axios client & helpers
│   ├── CartList/            # Cart components
│   ├── Checkout/            # Payment & thank-you pages
│   ├── Components/          # Shared components (Navbar, ProductCard, Filters, etc.)
│   ├── config/              # Frontend catalog config
│   ├── hooks/               # Custom React hooks
│   ├── Pages/               # Route pages (Home, Login, Admin, etc.)
│   ├── Redux/               # Redux store, actions, reducers
│   ├── SingleProd/          # Product detail & edit components
│   ├── Styles/              # CSS modules
│   ├── utils/               # Query helpers
│   ├── WishList/            # Wishlist components
│   └── App.js               # Root component with routing
├── docker-compose.yml       # Local MongoDB setup
├── .env.example             # Environment variable template
└── package.json
```

## Admin Access

Log in with the admin credentials from `server/.env` (default: `admin@hsshop.com` / `ChangeMe123!`) to access the admin panel where you can manage products and view customer orders.
