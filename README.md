# Premium Poker Table - Backend

Express-based backend for e-commerce operations including product, category, and order management.

---

## Tech Stack

* **Node.js**
* **Express.js**
* **Sequelize ORM**
* **PostgreSQL**

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create `.env`:

```env
DB_NAME=uniworld_omniport
DB_USER
DB_PASSWORD
DB_HOST
DB_DIALECT
PORT=5000
NODE_ENV=development
```

### 3. Create PostgreSQL Database

```sql
CREATE DATABASE uniworld_omniport;
```

### 4. Run migrations & seeders

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 5. Start Server

```bash
npm run start
```

---

## API Endpoints

### ✅ Product APIs

| Method | Endpoint       | Description             |
| ------ | -------------- | ----------------------- |
| POST   | /products      | Add new product         |
| PUT    | /products/\:id | Edit product            |
| DELETE | /products/\:id | Delete product          |
| GET    | /products      | View all (with filters) |
| GET    | /products/\:id | View single product     |

---

### Order APIs

| Method | Endpoint | Description    |
| ------ | -------- | -------------- |
| POST   | /orders  | Place an order |

---

### Category APIs

| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| GET    | /categories | Get all categories |

---
