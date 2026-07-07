import notifee, {
  AndroidImportance,
  TriggerType,
} from "@notifee/react-native";

class NotificationService {
  // ======================================
  // Initialize Notification Channel
  // ======================================

  async initialize() {
    await notifee.createChannel({
      id: "arabiancafe",
      name: "ArabianCafe Notifications",
      importance: AndroidImportance.HIGH,
    });
  }

  // ======================================
  // Request Permission
  // ======================================

  async requestPermission() {
    await notifee.requestPermission();
  }

  // ======================================
  // Show Notification
  // ======================================

  async showNotification(
    title,
    body
  ) {
    await notifee.displayNotification({
      title,
      body,

      android: {
        channelId: "arabiancafe",

        smallIcon: "ic_launcher",

        pressAction: {
          id: "default",
        },
      },
    });
  }

  // ======================================
  // Order Ready
  // ======================================

  async orderReady(orderNo) {
    await this.showNotification(
      "Order Ready",
      `Order #${orderNo} is ready for delivery.`
    );
  }

  // ======================================
  // Low Stock Alert
  // ======================================

  async lowStock(
    productName,
    quantity
  ) {
    await this.showNotification(
      "Low Stock Alert",
      `${productName} stock is low (${quantity} remaining).`
    );
  }

  // ======================================
  // Payment Received
  // ======================================

  async paymentReceived(
    orderNo,
    amount
  ) {
    await this.showNotification(
      "Payment Received",
      `₹${amount} received for Order #${orderNo}.`
    );
  }

  // ======================================
  // Daily Sales Reminder
  // ======================================

  async dailyReminder() {
    await this.showNotification(
      "Daily Sales Report",
      "Review today's sales before closing the restaurant."
    );
  }

  // ======================================
  // Schedule Notification
  // ======================================

  async scheduleNotification(
    title,
    body,
    date
  ) {
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title,
        body,

        android: {
          channelId: "arabiancafe",

          smallIcon: "ic_launcher",

          pressAction: {
            id: "default",
          },
        },
      },
      trigger
    );
  }

  // ======================================
  // Cancel Notification
  // ======================================

  async cancel(notificationId) {
    await notifee.cancelNotification(
      notificationId
    );
  }

  // ======================================
  // Cancel All Notifications
  // ======================================

  async cancelAll() {
    await notifee.cancelAllNotifications();
  }

  // ======================================
  // Badge Count
  // ======================================

  async setBadgeCount(count) {
    await notifee.setBadgeCount(count);
  }

  async clearBadge() {
    await notifee.setBadgeCount(0);
  }
}

export default new NotificationService();