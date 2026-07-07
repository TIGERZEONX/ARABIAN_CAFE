import { Alert } from "react-native";

/*
=========================================
Printer Service
Supports:
- Thermal Printer
- Bluetooth Printer
- USB Printer
- Kitchen Order Ticket (KOT)
- Bill Printing
- Report Printing
=========================================
*/

class PrinterService {
  constructor() {
    this.connected = false;
    this.printer = null;
  }

  // =====================================
  // Connect Printer
  // =====================================

  async connect(printerInfo) {
    try {
      // TODO:
      // Integrate printer SDK here
      // Examples:
      // react-native-esc-pos-printer
      // react-native-bluetooth-escpos-printer

      this.connected = true;
      this.printer = printerInfo;

      console.log("Printer Connected");

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  // =====================================
  // Disconnect
  // =====================================

  async disconnect() {
    try {
      this.connected = false;
      this.printer = null;

      console.log("Printer Disconnected");

      return true;
    } catch (error) {
      return false;
    }
  }

  // =====================================
  // Status
  // =====================================

  isConnected() {
    return this.connected;
  }

  getPrinter() {
    return this.printer;
  }

  // =====================================
  // Print Bill
  // =====================================

  async printBill(order) {
    try {
      if (!this.connected) {
        Alert.alert(
          "Printer",
          "Printer is not connected."
        );

        return;
      }

      console.log("Printing Bill...");

      console.log(order);

      /*
      Integrate ESC/POS commands here
      */

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  // =====================================
  // Kitchen Order Ticket
  // =====================================

  async printKOT(order) {
    try {
      if (!this.connected) {
        return;
      }

      console.log("Printing KOT");

      console.log(order);

      return true;
    } catch (error) {
      return false;
    }
  }

  // =====================================
  // Reports
  // =====================================

  async printReport(report) {
    try {
      if (!this.connected) {
        return;
      }

      console.log("Printing Report");

      console.log(report);

      return true;
    } catch (error) {
      return false;
    }
  }

  // =====================================
  // Reprint Bill
  // =====================================

  async reprint(order) {
    return await this.printBill(order);
  }

  // =====================================
  // Test Print
  // =====================================

  async testPrint() {
    try {
      if (!this.connected) {
        Alert.alert(
          "Printer",
          "Printer is not connected."
        );

        return false;
      }

      console.log("Test Print");

      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new PrinterService();