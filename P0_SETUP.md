# HS-shop P0 Setup

## What changed (P0)

- Added a real Express + MongoDB backend in `server/`
- JWT auth with session persistence (login, signup, logout)
- Admin routes protected on frontend and backend
- User-scoped cart, wishlist, and orders
- Removed raw card collection; Stripe Checkout or COD fallback
- Fixed cart/wishlist button conflict on product detail pages

## Prerequisites

- Node.js 18+
- MongoDB (local install, Docker, or MongoDB Atlas)

## Quick start

### 1. Start MongoDB

**Docker (recommended):**

```bash
docker compose up -d mongo
```

**Or** use a MongoDB Atlas connection string in `server/.env`.

### 2. Configure environment

```bash
cp server/.env.example server/.env
cp .env.example .env
```

Update `server/.env`:

- `JWT_SECRET` — use a long random string in production
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — admin login credentials
- `STRIPE_SECRET_KEY` — optional; leave blank for Cash on Delivery mode

### 3. Install and seed

```bash
cd server
npm install
npm run seed
npm run dev
```

### 4. Start the frontend (new terminal)

```bash
npm install
npm start
```

App: http://localhost:3000  
API: http://localhost:5000/api

## Default admin login

Use the credentials from `server/.env`:

- Email: `admin@hsshop.com` (default)
- Password: `ChangeMe123!` (default — change this)

## Stripe payments (optional)

1. Create a Stripe account and get test API keys
2. Set `STRIPE_SECRET_KEY=sk_test_...` in `server/.env`
3. Checkout redirects to Stripe Hosted Checkout (no card data touches your server)

Without Stripe keys, orders are placed as **Cash on Delivery**.

## API overview

| Endpoint | Auth | Description |
|----------|------|-------------|
| `POST /api/auth/register` | No | Create account |
| `POST /api/auth/login` | No | Login |
| `GET /api/auth/me` | Yes | Current user |
| `GET /api/home` | No | Products |
| `GET/POST/DELETE /api/cart` | Yes | User cart |
| `GET/POST/DELETE /api/wish` | Yes | User wishlist |
| `POST /api/payments/create-checkout-session` | Yes | Place order / Stripe |
| `GET /api/userDetails` | Admin | Home delivery orders |
| `PATCH /api/home/:id` | Admin | Edit product |
