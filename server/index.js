const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const user_routes = require("./routes/userRoutes");
const product_routes = require("./routes/productRoutes");
const homePage_routes = require("./routes/homePageRoutes");
const review_routes = require("./routes/reviewRoutes");
const path = require("path");

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Database connnected"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["https://ecommerce-website-9k8k.onrender.com"],
  })
);
app.use("/api/v1", user_routes);
app.use("/api/v1", product_routes);
app.use("/api/v1", homePage_routes);
app.use("/api/v1", review_routes);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`Server started at PORT:${process.env.PORT}`)
);
