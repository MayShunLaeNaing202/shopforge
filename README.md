# ShopForge 🛍️

A full-stack e-commerce web application built from scratch following the complete Software Development Life Cycle (SDLC) — from requirements gathering and system design to implementation, testing, and deployment.

**🔗 Live Demo:** [shopforge-pied.vercel.app](https://shopforge-pied.vercel.app/)

## Overview

ShopForge is a modern online store where shoppers can browse products, manage a cart, check out, and track their orders — while admins manage the product catalog and view all orders from a dedicated dashboard. It was built as a portfolio project to demonstrate proficiency in React, TypeScript, and modern frontend architecture.

## Tech Stack

| Category         | Technology      |
| ---------------- | --------------- |
| Framework        | React 19        |
| Language         | TypeScript 6    |
| Build Tool       | Vite 8          |
| Styling          | Tailwind CSS v4 |
| Routing          | React Router v7 |
| State Management | Zustand v5      |
| Icons            | Lucide React    |
| Deployment       | Vercel          |

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

<<<<<<< HEAD

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

=======

### Shopper-facing

- Browse products with live search and category filtering
- Product cards with ratings, stock status, and category badges
- Shopping cart with quantity controls, persisted across sessions
- User registration and login with protected routes
- Multi-step checkout with shipping address and payment form validation
- Order confirmation and full order history

### Admin-facing

- Role-based admin dashboard (separate from shopper experience)
- Store overview: total products, orders, revenue, and pending orders
- Full product CRUD — add, edit, and delete products with image preview
- Order management table across all customers

## Architecture Decisions

**Why Zustand over Redux?**
Redux requires significant boilerplate (actions, reducers, dispatchers) for relatively simple global state needs. Zustand achieves the same shared-state goals — cart, auth, products, orders — with a fraction of the code, while still supporting middleware like `persist` for localStorage syncing.

**Why a feature-based folder structure?**
Components are organized by domain (`product/`, `cart/`, `layout/`, `ui/`) rather than by type, so related files are easy to locate and the codebase scales cleanly as features grow.

**Why separate custom hooks from components?**
Logic such as search/filter (`useProducts`) is extracted from UI components, keeping components focused on rendering while hooks own state and business logic — improving testability and reuse.

**Why `persist` middleware on every store?**
Cart, auth, products, and orders all survive a page refresh via `localStorage`, simulating the experience of a real backend without requiring one.

## Project Structure

```
src/
├── components/
│   ├── ui/          → Button, Badge, Input, StarRating
│   ├── layout/       → Navbar, ProtectedRoute
│   ├── product/      → ProductCard, ProductGrid
│   └── cart/          → CartItem, CartSummary
├── pages/
│   ├── admin/         → AdminDashboard, AdminProducts, AdminProductForm, AdminOrders
│   └── *.tsx           → HomePage, CartPage, LoginPage, RegisterPage, CheckoutPage, OrderConfirmPage, OrdersPage
├── store/              → cartStore, authStore, productStore, orderStore (Zustand)
├── hooks/              → useProducts
├── types/              → Shared TypeScript types
├── data/               → Seed product data
└── router/             → Route configuration
```

## SDLC Process

This project was built by deliberately following each phase of the software development lifecycle:

1. **Planning** — Defined user roles (shopper/admin), MVP feature scope, and TypeScript data models before writing any UI code
2. **System Design** — Mapped folder structure, routing strategy, and state management approach
3. **Environment Setup** — Vite + React + TypeScript scaffold, Tailwind configuration, dependency installation
4. **Implementation** — Built incrementally across six modules (UI components → product catalog → cart → auth → checkout/orders → admin dashboard), each on its own feature branch
5. **Version Control** — Git feature-branch workflow with Conventional Commits (`feat:`, `fix:`, `chore:`)
6. **Deployment** — Continuous deployment to Vercel on every push to `main`

## Running Locally

```bash
git clone https://github.com/MayShunLaeNaing202/shopforge.git
cd shopforge
npm install
npm run dev
```

### Demo Accounts

| Role    | Email               | Password |
| ------- | ------------------- | -------- |
| Shopper | may@shopforge.com   | may123   |
| Admin   | admin@shopforge.com | admin123 |

---

## Author

Built by **May Shun Lae Naing** as a portfolio project to demonstrate full-stack frontend development skills with modern React tooling.

> > > > > > > ec012aba7c37050eb641ec188bc42141ba6e2da5
