require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const categoryRoutes = require('./routes/category.routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Uniworld Omniport API is running");
});

// DB CONNECTION & START SERVER
const PORT = process.env.PORT || 3000;
sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB Connection Error", err));
