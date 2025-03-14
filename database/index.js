const { Pool } = require("pg");
const mongoose = require("mongoose");

const pgPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blog_system",
  password: "Teva",
  port: 5432,
  idleTimeoutMillis: 300,
});

const connectPostgres = async () => {
try {
    await pgPool.connect();
    console.log("PostgreSQL connected");
} catch (err) {
    console.error("PostgreSQL connection failed:", err);
    process.exit(1);
}
};

const connectMongo = async () => {
try {
    await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
} catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
}
};

module.exports = { connectPostgres, connectMongo, pgPool };
