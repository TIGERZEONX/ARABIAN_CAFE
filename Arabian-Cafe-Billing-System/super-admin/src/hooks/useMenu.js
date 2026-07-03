import { useState, useEffect } from "react";
import { getCategories, getMenuItems } from "../services/menuService";

export default function useMenu() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const loadMenuData = async () => {
            try {
                setLoading(true);
                const [catRes, itemsRes] = await Promise.all([
                    getCategories(),
                    getMenuItems(selectedCategory)
                ]);
                setCategories(catRes.data.data);
                setMenuItems(itemsRes.data.data);
                setError(null);
            } catch (err) {
                console.error("Error loading menu data:", err);
                setError(err.response?.data?.message || "Failed to load menu information");
            } finally {
                setLoading(false);
            }
        };

        loadMenuData();
    }, [selectedCategory]);

    return {
        categories,
        menuItems,
        selectedCategory,
        setSelectedCategory,
        loading,
        error
    };
}
