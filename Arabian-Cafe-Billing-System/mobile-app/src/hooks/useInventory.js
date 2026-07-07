import { useState, useCallback, useMemo } from "react";

import inventoryService from "../services/inventoryService";

const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] =
    useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const [summary, setSummary] = useState(null);

  // ==========================
  // Load Inventory
  // ==========================

  const loadInventory = useCallback(
    async (params = {}) => {
      try {
        setLoading(true);

        setError(null);

        const data =
          await inventoryService.getInventory(
            params
          );

        setInventory(data);

        setFilteredInventory(data);

        return data;
      } catch (err) {
        setError(err.message);

        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ==========================
  // Refresh
  // ==========================

  const refreshInventory =
    useCallback(async () => {
      return await loadInventory();
    }, [loadInventory]);

  // ==========================
  // Create
  // ==========================

  const create = useCallback(
    async (item) => {
      const response =
        await inventoryService.createInventory(
          item
        );

      const updated = [
        response,
        ...inventory,
      ];

      setInventory(updated);

      return response;
    },
    [inventory]
  );

  // ==========================
  // Update
  // ==========================

  const update = useCallback(
    async (id, item) => {
      const response =
        await inventoryService.updateInventory(
          id,
          item
        );

      const updated =
        inventory.map((product) =>
          product.id === id
            ? response
            : product
        );

      setInventory(updated);

      return response;
    },
    [inventory]
  );

  // ==========================
  // Delete
  // ==========================

  const remove = useCallback(
    async (id) => {
      await inventoryService.deleteInventory(
        id
      );

      setInventory(
        inventory.filter(
          (item) =>
            item.id !== id
        )
      );
    },
    [inventory]
  );

  // ==========================
  // Stock In
  // ==========================

  const stockIn = useCallback(
    async (id, quantity) => {
      return await inventoryService.stockIn(
        id,
        quantity
      );
    },
    []
  );

  // ==========================
  // Stock Out
  // ==========================

  const stockOut = useCallback(
    async (id, quantity) => {
      return await inventoryService.stockOut(
        id,
        quantity
      );
    },
    []
  );

  // ==========================
  // Summary
  // ==========================

  const loadSummary =
    useCallback(async () => {
      const result =
        await inventoryService.getInventorySummary();

      setSummary(result);

      return result;
    }, []);

  // ==========================
  // Search
  // ==========================

  const searchInventory =
    useCallback(
      (keyword) => {
        setSearch(keyword);

        const result =
          inventoryService.searchInventory(
            inventory,
            keyword
          );

        setFilteredInventory(result);
      },
      [inventory]
    );

  // ==========================
  // Filter
  // ==========================

  const filterCategory =
    useCallback(
      (value) => {
        setCategory(value);

        const result =
          inventoryService.filterByCategory(
            inventory,
            value
          );

        setFilteredInventory(result);
      },
      [inventory]
    );

  // ==========================
  // Statistics
  // ==========================

  const statistics = useMemo(() => {
    return inventoryService.calculateStatistics(
      inventory
    );
  }, [inventory]);

  // ==========================
  // Low Stock
  // ==========================

  const lowStockItems =
    useMemo(() => {
      return inventory.filter((item) =>
        inventoryService.isLowStock(item)
      );
    }, [inventory]);

  // ==========================
  // Out Of Stock
  // ==========================

  const outOfStockItems =
    useMemo(() => {
      return inventory.filter((item) =>
        inventoryService.isOutOfStock(
          item
        )
      );
    }, [inventory]);

  // ==========================
  // Clear Error
  // ==========================

  const clearError =
    useCallback(() => {
      setError(null);
    }, []);

  return {
    inventory,

    filteredInventory,

    loading,

    error,

    summary,

    search,

    category,

    statistics,

    lowStockItems,

    outOfStockItems,

    loadInventory,

    refreshInventory,

    create,

    update,

    remove,

    stockIn,

    stockOut,

    loadSummary,

    searchInventory,

    filterCategory,

    clearError,
  };
};

export default useInventory;