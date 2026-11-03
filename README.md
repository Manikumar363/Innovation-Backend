# Node.js + Express + MongoDB Backend (TypeScript)

A production-ready starter backend built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 📁 Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.ts             # MongoDB Mongoose connection & listeners
│   ├── middleware/
│   │   └── errorHandler.ts   # 404 & Centralized error handler
│   ├── routes/
│   │   └── health.ts         # Server & DB health check route (/api/health)
│   ├── app.ts                # Express application configuration & middlewares
│   └── server.ts             # Server entry point & graceful shutdown
├── .env                      # Environment variables (local)
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
└── tsconfig.json             # TypeScript compiler configuration
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB** running locally (`localhost:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.

### 2. Configure Environment
Check your `.env` file and adjust the connection URI if necessary:
```env
PORT=5000
NODE_ENV=development
# Local MongoDB:
MONGODB_URI=mongodb://127.0.0.1:27017/express_mongo_db

# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/express_mongo_db?retryWrites=true&w=majority
```

### 3. Available Scripts

- **Development mode (with hot-reload):**
  ```bash
  npm run dev
  ```
- **Build TypeScript into JavaScript (`dist/`):**
  ```bash
  npm run build
  ```
- **Run Production build:**
  ```bash
  npm start
  ```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status & welcome message |
| `GET` | `/api/health` | Health check returning uptime and MongoDB ready state |
