# Blog System API

A simple RESTful API for a blog system built using **Node.js, Express.js, PostgreSQL, and MongoDB**.

- **PostgreSQL** stores structured data (authors).
- **MongoDB** stores unstructured data (blog posts).

## 📁 Project Structure
```
blog-system/
│── node_modules/         # Installed dependencies
│── routes/               # API routes
│   ├── author.js         # CRUD operations for authors (PostgreSQL)
│   ├── posts.js          # CRUD operations for blog posts (MongoDB)
│── database/             # Database connections
│   ├── index.js          # Database connection management
│── .env                  # Environment variables
│── package.json          # Node.js project configuration
│── server.js             # Main Express server entry point
│── README.md             # Project documentation
```

## 🛠️ Installation & Setup

### 1️⃣ Install Dependencies
```bash
npm install express pg mongoose dotenv cors
```

### 2️⃣ Set Up Databases

#### **🔹 PostgreSQL**
1. Start PostgreSQL service:
   ```bash
   sudo service postgresql start   # (Linux/macOS)
   net start PostgreSQL            # (Windows)
   ```
2. Create a database in PostgreSQL:
   ```sql
   CREATE DATABASE blog_system;
   ```
3. Create an `authors` table:
   ```sql
   CREATE TABLE authors (
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL
   );
   ```

#### **🔹 MongoDB**
1. Start MongoDB:
   ```bash
   mongod --dbpath /data/db  # Linux/macOS
   net start MongoDB          # Windows
   ```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```
POSTGRES_URI=postgres://postgres:Teva@localhost:5432/blog_system
MONGO_URI=mongodb://127.0.0.1:27017/blogDB
PORT=3000
```

### 4️⃣ Start the Server
```bash
node server.js
```
Or, if using `nodemon`:
```bash
nodemon server.js
```

---

## 📌 API Endpoints

### **🔹 Authors (PostgreSQL)**
| Method | Endpoint        | Description             |
|--------|---------------|-------------------------|
| `POST` | `/api/author`  | Create a new author    |
| `GET`  | `/api/author`  | Get all authors        |
| `PUT`  | `/api/author/:id` | Update an author  |
| `DELETE` | `/api/author/:id` | Delete an author  |

### **🔹 Blog Posts (MongoDB)**
| Method | Endpoint       | Description             |
|--------|---------------|-------------------------|
| `POST` | `/api/posts`   | Create a new post      |
| `GET`  | `/api/posts`   | Get all posts          |
| `PUT`  | `/api/posts/:id` | Update a post       |
| `DELETE` | `/api/posts/:id` | Delete a post       |

---

## 🚀 Technologies Used
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Relational database (for authors)
- **MongoDB** - NoSQL database (for blog posts)
- **Mongoose** - ODM for MongoDB
- **pg** - PostgreSQL client for Node.js
- **dotenv** - Loads environment variables
