import inventoryApi from "../api/inventoryApi";

class InventoryService {
  // ======================================
  // Get All Inventory
  // ======================================

  async getInventory(params = {}) {
    return await inventoryApi.getInventory(params);
  }

  // ======================================
  // Get Item By ID
  // ======================================

  async getInventoryById(id) {
    return await inventoryApi.getInventoryById(id);
  }

  // ======================================
  // Create Inventory Item
  // ======================================

  async createInventory(data) {
    return await inventoryApi.createInventory(data);
  }

  // ======================================
  // Update Inventory Item
  // ======================================

  async updateInventory(id, data) {
    return await inventoryApi.updateInventory(id, data);
  }

  // ======================================
  // Delete Inventory Item
  // ======================================

  async deleteInventory(id) {
    return await inventoryApi.deleteInventory(id);
  }

  // ======================================
  // Stock In
  // ======================================

  async stockIn(id, quantity) {
    return await inventoryApi.stockIn(
      id,
      quantity
    );
  }

  // ======================================
  // Stock Out
  // ======================================

  async stockOut(id, quantity) {
    return await inventoryApi.stockOut(
      id,
      quantity
    );
  }

  // ======================================
  // Update Stock
  // ======================================

  async updateStock(id, quantity) {
    return await inventoryApi.updateStock(
      id,
      quantity
    );
  }

  // ======================================
  // Low Stock Items
  // ======================================

  async getLowStockItems() {
    return await inventoryApi.getLowStockItems();
  }

  // ======================================
  // Inventory Summary
  // ======================================

  async getInventorySummary() {
    return await inventoryApi.getInventorySummary();
  }

  // ======================================
  // Check Low Stock
  // ======================================

  isLowStock(item, minimumStock = 10) {
    return Number(item.stock) <= minimumStock;
  }

  // ======================================
  // Check Out of Stock
  // ======================================

  isOutOfStock(item) {
    return Number(item.stock) <= 0;
  }

  // ======================================
  // Validate Stock
  // ======================================

  validateStock(item, quantity) {
    return Number(item.stock) >= Number(quantity);
  }

  // ======================================
  // Calculate Inventory Value
  // ======================================

  calculateInventoryValue(items = []) {
    return items.reduce(
      (total, item) =>
        total +
        Number(item.stock || 0) *
          Number(item.costPrice || 0),
      0
    );
  }

  // ======================================
  // Inventory Statistics
  // ======================================

  calculateStatistics(items = []) {
    const totalItems = items.length;

    const lowStockItems = items.filter(
      (item) => this.isLowStock(item)
    ).length;

    const outOfStockItems = items.filter(
      (item) => this.isOutOfStock(item)
    ).length;

    const inventoryValue =
      this.calculateInventoryValue(items);

    return {
      totalItems,
      lowStockItems,
      outOfStockItems,
      inventoryValue,
    };
  }

  // ======================================
  // Search Inventory
  // ======================================

  searchInventory(items, keyword = "") {
    if (!keyword.trim()) {
      return items;
    }

    const search = keyword.toLowerCase();

    return items.filter(
      (item) =>
        item.name
          ?.toLowerCase()
          .includes(search) ||
        item.category
          ?.toLowerCase()
          .includes(search)
    );
  }

  // ======================================
  // Filter By Category
  // ======================================

  filterByCategory(
    items,
    category = "All"
  ) {
    if (category === "All") {
      return items;
    }

    return items.filter(
      (item) => item.category === category
    );
  }

  // ======================================
  // Sort Inventory
  // ======================================

  sortInventory(
    items,
    field = "name",
    order = "asc"
  ) {
    return [...items].sort((a, b) => {
      if (order === "asc") {
        return String(a[field]).localeCompare(
          String(b[field])
        );
      }

      return String(b[field]).localeCompare(
        String(a[field])
      );
    });
  }
}

export default new InventoryService();