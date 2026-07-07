import AsyncStorage from "@react-native-async-storage/async-storage";

class StorageService {
  // ======================================
  // Save Data
  // ======================================

  async setItem(key, value) {
    try {
      const data =
        typeof value === "string"
          ? value
          : JSON.stringify(value);

      await AsyncStorage.setItem(key, data);

      return true;
    } catch (error) {
      console.log("Storage Error:", error);

      return false;
    }
  }

  // ======================================
  // Get Data
  // ======================================

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value === null) {
        return null;
      }

      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.log("Storage Error:", error);

      return null;
    }
  }

  // ======================================
  // Remove Data
  // ======================================

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);

      return true;
    } catch (error) {
      console.log("Storage Error:", error);

      return false;
    }
  }

  // ======================================
  // Save Multiple Items
  // ======================================

  async multiSet(items) {
    try {
      const formattedItems = items.map(
        ([key, value]) => [
          key,
          typeof value === "string"
            ? value
            : JSON.stringify(value),
        ]
      );

      await AsyncStorage.multiSet(
        formattedItems
      );

      return true;
    } catch (error) {
      console.log("Storage Error:", error);

      return false;
    }
  }

  // ======================================
  // Get Multiple Items
  // ======================================

  async multiGet(keys) {
    try {
      const values =
        await AsyncStorage.multiGet(keys);

      const result = {};

      values.forEach(([key, value]) => {
        if (value === null) {
          result[key] = null;
          return;
        }

        try {
          result[key] = JSON.parse(value);
        } catch {
          result[key] = value;
        }
      });

      return result;
    } catch (error) {
      console.log("Storage Error:", error);

      return {};
    }
  }

  // ======================================
  // Remove Multiple Items
  // ======================================

  async multiRemove(keys) {
    try {
      await AsyncStorage.multiRemove(keys);

      return true;
    } catch (error) {
      console.log("Storage Error:", error);

      return false;
    }
  }

  // ======================================
  // Get All Keys
  // ======================================

  async getAllKeys() {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  // ======================================
  // Clear Storage
  // ======================================

  async clear() {
    try {
      await AsyncStorage.clear();

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }

  // ======================================
  // Check Key Exists
  // ======================================

  async hasKey(key) {
    try {
      const keys =
        await AsyncStorage.getAllKeys();

      return keys.includes(key);
    } catch (error) {
      return false;
    }
  }

  // ======================================
  // Merge JSON Data
  // ======================================

  async mergeItem(key, value) {
    try {
      await AsyncStorage.mergeItem(
        key,
        JSON.stringify(value)
      );

      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}

export default new StorageService();