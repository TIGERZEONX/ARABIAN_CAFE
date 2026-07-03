import { useState, useEffect } from "react";
import { getCategories, getMenuItems, createCategory, createMenuItem } from "../../services/menuService";
import { getIngredients } from "../../services/inventoryService";
import styles from "./MenuManagement.module.css";

export default function MenuManagement() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [ingredients, setIngredients] = useState([]); // Master raw materials list
    const [activeTab, setActiveTab] = useState("items"); // 'items' or 'categories'
    const [loading, setLoading] = useState(true);

    // Forms States
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [parentCategory, setParentCategory] = useState("");

    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemCategory, setItemCategory] = useState("");
    const [itemBasePrice, setItemBasePrice] = useState("");
    const [variations, setVariations] = useState([]); // [{ size: '', price: 0 }]
    const [addons, setAddons] = useState([]); // [{ name: '', price: 0 }]
    const [recipe, setRecipe] = useState([]); // [{ ingredient: '', quantityRequired: 0 }]

    // Messages
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);
            const [catRes, itemsRes, ingRes] = await Promise.all([
                getCategories(),
                getMenuItems(),
                getIngredients()
            ]);
            setCategories(catRes.data.data);
            setMenuItems(itemsRes.data.data);
            setIngredients(ingRes.data.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load menu config");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // --- Category Submissions ---
    const handleAddCategory = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        try {
            const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            await createCategory({
                name: categoryName,
                slug,
                description: categoryDescription,
                parentCategory: parentCategory || null,
            });
            setMessage("Category created successfully! 🎉");
            setCategoryName("");
            setCategoryDescription("");
            setParentCategory("");
            loadData();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create category");
        }
    };

    // --- Recipe Actions ---
    const addRecipeField = () => {
        setRecipe([...recipe, { ingredient: "", quantityRequired: "" }]);
    };

    const removeRecipeField = (index) => {
        setRecipe(recipe.filter((_, i) => i !== index));
    };

    const handleRecipeChange = (index, field, value) => {
        const updated = [...recipe];
        updated[index][field] = field === "quantityRequired" ? parseFloat(value) || "" : value;
        setRecipe(updated);
    };

    // --- MenuItem Variations and Addons Actions ---
    const addVariationField = () => {
        setVariations([...variations, { size: "", price: "" }]);
    };

    const removeVariationField = (index) => {
        setVariations(variations.filter((_, i) => i !== index));
    };

    const handleVariationChange = (index, field, value) => {
        const updated = [...variations];
        updated[index][field] = field === "price" ? parseFloat(value) || "" : value;
        setVariations(updated);
    };

    const addAddonField = () => {
        setAddons([...addons, { name: "", price: "" }]);
    };

    const removeAddonField = (index) => {
        setAddons(addons.filter((_, i) => i !== index));
    };

    const handleAddonChange = (index, field, value) => {
        const updated = [...addons];
        updated[index][field] = field === "price" ? parseFloat(value) || "" : value;
        setAddons(updated);
    };

    // --- MenuItem Submissions ---
    const handleAddMenuItem = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        try {
            // Filter out empty options
            const filteredVariations = variations.filter(v => v.size && v.price);
            const filteredAddons = addons.filter(a => a.name && a.price);
            const filteredRecipe = recipe.filter(r => r.ingredient && r.quantityRequired);

            await createMenuItem({
                name: itemName,
                description: itemDescription,
                category: itemCategory,
                price: parseFloat(itemBasePrice) || 0,
                variations: filteredVariations,
                addons: filteredAddons,
                recipe: filteredRecipe, // Link raw materials recipe map
            });

            setMessage("Menu item created successfully! 🍔");
            setItemName("");
            setItemDescription("");
            setItemCategory("");
            setItemBasePrice("");
            setVariations([]);
            setAddons([]);
            setRecipe([]);
            loadData();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create menu item");
        }
    };

    if (loading) return <div style={{ padding: "40px", fontFamily: "Poppins" }}>Loading Menu Manager...</div>;

    return (
        <div style={{ padding: "40px", fontFamily: "Poppins" }}>
            <div style={{ marginBottom: "35px" }}>
                <h1 style={{ fontSize: "30px", fontWeight: "800", color: "var(--text)" }}>Menu Management</h1>
                <p style={{ color: "var(--text-light)" }}>Manage your café menu categories, dishes, sizes, and addons dynamically.</p>
            </div>

            {message && <div style={{ padding: "12px", background: "#DCFCE7", color: "#166534", borderRadius: "8px", marginBottom: "20px" }}>{message}</div>}
            {error && <div style={{ padding: "12px", background: "#FEE2E2", color: "#991B1B", borderRadius: "8px", marginBottom: "20px" }}>{error}</div>}

            {/* Tabs */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "25px", borderBottom: "1px solid var(--border)", paddingBottom: "10px" }}>
                <button
                    onClick={() => setActiveTab("items")}
                    style={{ padding: "10px 20px", background: activeTab === "items" ? "var(--primary)" : "transparent", color: activeTab === "items" ? "white" : "var(--text)", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600" }}
                >
                    Menu Items
                </button>
                <button
                    onClick={() => setActiveTab("categories")}
                    style={{ padding: "10px 20px", background: activeTab === "categories" ? "var(--primary)" : "transparent", color: activeTab === "categories" ? "white" : "var(--text)", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600" }}
                >
                    Categories
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "30px" }}>

                {/* LEFT COLUMN: LIST */}
                <div style={{ background: "white", padding: "25px", borderRadius: "18px", boxShadow: "var(--shadow)" }}>
                    {activeTab === "items" ? (
                        <>
                            <h3 style={{ marginBottom: "15px", color: "var(--primary-dark)" }}>Current Menu Items</h3>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ background: "var(--primary-light)" }}>
                                        <th style={{ padding: "12px", textAlign: "left" }}>Item Name</th>
                                        <th style={{ padding: "12px", textAlign: "left" }}>Category</th>
                                        <th style={{ padding: "12px", textAlign: "left" }}>Base Price</th>
                                        <th style={{ padding: "12px", textAlign: "left" }}>Variations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {menuItems.map((item) => (
                                        <tr key={item._id} style={{ borderBottom: "1px solid var(--border)" }}>
                                            <td style={{ padding: "12px" }}><strong>{item.name}</strong></td>
                                            <td style={{ padding: "12px" }}>{item.category?.name || "Uncategorized"}</td>
                                            <td style={{ padding: "12px" }}>₹{item.price}</td>
                                            <td style={{ padding: "12px" }}>
                                                {item.variations?.map(v => `${v.size} (₹${v.price})`).join(", ") || "None"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <>
                            <h3 style={{ marginBottom: "15px", color: "var(--primary-dark)" }}>Current Categories</h3>
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ background: "var(--primary-light)" }}>
                                        <th style={{ padding: "12px", textAlign: "left" }}>Category Name</th>
                                        <th style={{ padding: "12px", textAlign: "left" }}>Parent Category</th>
                                        <th style={{ padding: "12px", textAlign: "left" }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat) => (
                                        <tr key={cat._id} style={{ borderBottom: "1px solid var(--border)" }}>
                                            <td style={{ padding: "12px" }}><strong>{cat.name}</strong></td>
                                            <td style={{ padding: "12px" }}>{cat.parentCategory?.name || "None"}</td>
                                            <td style={{ padding: "12px" }}>{cat.description || "—"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>

                {/* RIGHT COLUMN: DYNAMIC FORM */}
                <div style={{ background: "white", padding: "25px", borderRadius: "18px", boxShadow: "var(--shadow)" }}>
                    {activeTab === "items" ? (
                        <form onSubmit={handleAddMenuItem}>
                            <h3 style={{ marginBottom: "20px", color: "var(--primary-dark)" }}>Add Menu Item</h3>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>Item Name</label>
                                <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "10px" }} />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>Description</label>
                                <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} rows="2" style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "10px", fontFamily: "Poppins" }} />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                                <div>
                                    <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>Category</label>
                                    <select value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} required style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "10px" }}>
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>Base Price (₹)</label>
                                    <input type="number" value={itemBasePrice} onChange={(e) => setItemBasePrice(e.target.value)} required style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "10px" }} />
                                </div>
                            </div>

                            {/* Dynamic Recipe Mapping */}
                            <div style={{ marginBottom: "20px", padding: "15px", background: "var(--bg)", borderRadius: "12px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                    <label style={{ fontWeight: "700", fontSize: "14px", color: "var(--primary-dark)" }}>Recipe Map (Raw Materials)</label>
                                    <button type="button" onClick={addRecipeField} style={{ border: "none", color: "var(--primary)", background: "transparent", cursor: "pointer", fontWeight: "600" }}>+ Add Material</button>
                                </div>
                                {recipe.map((r, i) => {
                                    const selectedIng = ingredients.find(ing => ing._id === r.ingredient);
                                    return (
                                        <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "center" }}>
                                            <select value={r.ingredient} onChange={(e) => handleRecipeChange(i, "ingredient", e.target.value)} required style={{ flex: 1.5, padding: "8px", border: "1px solid var(--border)", borderRadius: "8px" }}>
                                                <option value="">Select Raw Material</option>
                                                {ingredients.map(ing => <option key={ing._id} value={ing._id}>{ing.name}</option>)}
                                            </select>
                                            <input type="number" step="0.001" placeholder="Quantity" value={r.quantityRequired} onChange={(e) => handleRecipeChange(i, "quantityRequired", e.target.value)} required style={{ flex: 1, padding: "8px", border: "1px solid var(--border)", borderRadius: "8px" }} />
                                            <span style={{ fontSize: "12px", width: "40px", color: "var(--text-light)" }}>{selectedIng ? selectedIng.unit : ""}</span>
                                            <button type="button" onClick={() => removeRecipeField(i)} style={{ border: "none", background: "transparent", color: "var(--danger)", cursor: "pointer" }}>✕</button>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Dynamic Size Variations */}
                            <div style={{ marginBottom: "20px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                    <label style={{ fontWeight: "600", fontSize: "14px" }}>Size Variations (Sub-items)</label>
                                    <button type="button" onClick={addVariationField} style={{ border: "none", color: "var(--primary)", background: "transparent", cursor: "pointer", fontWeight: "600" }}>+ Add Option</button>
                                </div>
                                {variations.map((v, i) => (
                                    <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                        <input type="text" placeholder="Size (e.g. Large)" value={v.size} onChange={(e) => handleVariationChange(i, "size", e.target.value)} required style={{ flex: 1, padding: "8px", border: "1px solid var(--border)", borderRadius: "8px" }} />
                                        <input type="number" placeholder="Price (₹)" value={v.price} onChange={(e) => handleVariationChange(i, "price", e.target.value)} required style={{ width: "100px", padding: "8px", border: "1px solid var(--border)", borderRadius: "8px" }} />
                                        <button type="button" onClick={() => removeVariationField(i)} style={{ border: "none", background: "transparent", color: "var(--danger)", cursor: "pointer" }}>✕</button>
                                    </div>
                                ))}
                            </div>

                            {/* Dynamic Addons */}
                            <div style={{ marginBottom: "20px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                    <label style={{ fontWeight: "600", fontSize: "14px" }}>Addons Options</label>
                                    <button type="button" onClick={addAddonField} style={{ border: "none", color: "var(--primary)", background: "transparent", cursor: "pointer", fontWeight: "600" }}>+ Add Option</button>
                                </div>
                                {addons.map((a, i) => (
                                    <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                                        <input type="text" placeholder="Addon (e.g. Extra Cheese)" value={a.name} onChange={(e) => handleAddonChange(i, "name", e.target.value)} required style={{ flex: 1, padding: "8px", border: "1px solid var(--border)", borderRadius: "8px" }} />
                                        <input type="number" placeholder="Price (₹)" value={a.price} onChange={(e) => handleAddonChange(i, "price", e.target.value)} required style={{ width: "100px", padding: "8px", border: "1px solid var(--border)", borderRadius: "8px" }} />
                                        <button type="button" onClick={() => removeAddonField(i)} style={{ border: "none", background: "transparent", color: "var(--danger)", cursor: "pointer" }}>✕</button>
                                    </div>
                                ))}
                            </div>

                            <button type="submit" style={{ width: "100%", padding: "12px", background: "var(--primary)", color: "white", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" }}>
                                Create Menu Item
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleAddCategory}>
                            <h3 style={{ marginBottom: "20px", color: "var(--primary-dark)" }}>Add Category</h3>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>Category Name</label>
                                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "10px" }} />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>Parent Category (Optional)</label>
                                <select value={parentCategory} onChange={(e) => setParentCategory(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "10px" }}>
                                    <option value="">None (Top Level)</option>
                                    {categories.filter(c => !c.parentCategory).map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                </select>
                            </div>

                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>Description</label>
                                <textarea value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)} rows="3" style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "10px", fontFamily: "Poppins" }} />
                            </div>

                            <button type="submit" style={{ width: "100%", padding: "12px", background: "var(--primary)", color: "white", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" }}>
                                Create Category
                            </button>
                        </form>
                    )}
                </div>

            </div>
        </div>
    );
}
