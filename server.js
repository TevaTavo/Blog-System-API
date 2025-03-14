require("dotenv").config();
const express = require("express");
const { connectPostgres, connectMongo } = require("./database");

const app = express();
app.use(express.json());

connectPostgres();
connectMongo();

const authorRoutes = require("./routes/author");
const postRoutes = require("./routes/posts");

app.use("/api/author", authorRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
