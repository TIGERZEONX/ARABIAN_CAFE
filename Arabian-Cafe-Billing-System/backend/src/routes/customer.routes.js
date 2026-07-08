const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

// Search customers (must be before /:id)
router.get("/search", customerController.searchCustomers);

// Basic CRUD
router.get("/", customerController.getCustomers);
router.post("/", customerController.createCustomer);
router.get("/:id", customerController.getCustomerById);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
