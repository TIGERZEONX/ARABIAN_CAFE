import orderApi from "../api/orderApi";

class ReportService {
  // ======================================
  // Dashboard Summary
  // ======================================

  async getDashboardSummary() {
    return await orderApi.getDashboardSummary();
  }

  // ======================================
  // Today's Report
  // ======================================

  async getTodayReport() {
    return await orderApi.getTodaySales();
  }

  // ======================================
  // Weekly Report
  // ======================================

  async getWeeklyReport() {
    return await orderApi.getWeeklySales();
  }

  // ======================================
  // Monthly Report
  // ======================================

  async getMonthlyReport() {
    return await orderApi.getMonthlySales();
  }

  // ======================================
  // Calculate Sales Summary
  // ======================================

  calculateSummary(orders = []) {
    const totalOrders = orders.length;

    const totalSales = orders.reduce(
      (sum, order) => sum + Number(order.grandTotal || 0),
      0
    );

    const totalItems = orders.reduce(
      (sum, order) => sum + Number(order.totalItems || 0),
      0
    );

    const averageOrderValue =
      totalOrders > 0
        ? totalSales / totalOrders
        : 0;

    return {
      totalOrders,
      totalItems,
      totalSales,
      averageOrderValue,
    };
  }

  // ======================================
  // Product Sales Report
  // ======================================

  generateProductReport(orders = []) {
    const products = {};

    orders.forEach((order) => {
      (order.items || []).forEach((item) => {
        if (!products[item.id]) {
          products[item.id] = {
            id: item.id,
            name: item.name,
            quantity: 0,
            sales: 0,
          };
        }

        products[item.id].quantity += item.quantity;

        products[item.id].sales +=
          item.quantity * item.price;
      });
    });

    return Object.values(products).sort(
      (a, b) => b.sales - a.sales
    );
  }

  // ======================================
  // Payment Summary
  // ======================================

  paymentSummary(orders = []) {
    const summary = {
      cash: 0,
      upi: 0,
      card: 0,
      wallet: 0,
      others: 0,
    };

    orders.forEach((order) => {
      const method =
        (order.paymentMethod || "")
          .toLowerCase();

      if (summary.hasOwnProperty(method)) {
        summary[method] += Number(
          order.grandTotal || 0
        );
      } else {
        summary.others += Number(
          order.grandTotal || 0
        );
      }
    });

    return summary;
  }

  // ======================================
  // Export CSV
  // ======================================

  exportCSV(data = []) {
    if (!data.length) {
      return "";
    }

    const headers = Object.keys(data[0]);

    const csv = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => row[header])
          .join(",")
      ),
    ].join("\n");

    return csv;
  }

  // ======================================
  // Printable Bill Data
  // ======================================

  preparePrintableBill(order) {
    return {
      restaurant: "ArabianCafe",
      orderNo: order.orderNo,
      customer: order.customerName,
      table: order.tableNumber,
      items: order.items,
      subtotal: order.subtotal,
      tax: order.tax,
      discount: order.discount,
      grandTotal: order.grandTotal,
      paymentMethod:
        order.paymentMethod,
      paymentStatus:
        order.paymentStatus,
      createdAt: order.createdAt,
    };
  }

  // ======================================
  // Printable Report
  // ======================================

  preparePrintableReport(report) {
    return {
      generatedAt: new Date(),
      ...report,
    };
  }
}

export default new ReportService();