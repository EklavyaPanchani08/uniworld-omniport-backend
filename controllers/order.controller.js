const { Order, Customer,OrderItem } = require("../models/index.js");

module.exports = placeOrder = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order data is required",
      });
    }
    const { customer, items, totalAmount } = req.body;

    if (!customer || !items || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Customer details, items, and total amount are required",
      });
    }
    if (!customer.name || !customer.email || !customer.address) {
      return res.status(400).json({
        success: false,
        message: "Customer name, email, and address are required",
      });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    const newCustomer = await Customer.create(customer);
    const order = await Order.create({customerId: newCustomer.id,totalAmount});
    const orderItems = items.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));
    await OrderItem.bulkCreate(orderItems);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (err) {
    console.error("Error placing order::", err);
    return res.status(500).json({
      success: false,
      message: "Order placement failed",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
};
