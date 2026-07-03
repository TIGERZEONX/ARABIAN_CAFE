import { useState, useEffect } from "react";
import { getIngredients, createIngredient, updateIngredient, deleteIngredient } from "../../services/inventoryService";
import styles from "./Inventory.module.css";

export default function Inventory() {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form states
    const [name, setName] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [purchaseUnit, setPurchaseUnit] = useState("kg");
    const [recipeUnit, setRecipeUnit] = useState("gm");
    const [conversionFactor, setConversionFactor] = useState("1000");
    const [initialStock, setInitialStock] = useState(""); // entered in recipe unit
    const [minStockAlert, setMinStockAlert] = useState("500");

    // Quick Refill states
    const [refillId, setRefillId] = useState(null);
    const [refillQty, setRefillQty] = useState("");

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await getIngredients();
            setIngredients(res.data.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch inventory stock list.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAddIngredient = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            await createIngredient({
                name,
                purchasePrice: parseFloat(purchasePrice) || 0,
                purchaseUnit,
                recipeUnit,
                conversionFactor: parseFloat(conversionFactor) || 1,
                stock: parseFloat(initialStock) || 0,
                minStockAlert: parseFloat(minStockAlert) || 0,
            });

            setMessage("Raw material registered successfully! 🥦");
            setName("");
            setPurchasePrice("");
            setInitialStock("");
            loadData();
        } catch (err) {
            setError("Failed to register material.");
        }
    };

    const handleRefillStock = async (e) => {
        e.preventDefault();
        if (!refillId || !refillQty) return;
        try {
            const ingredientToUpdate = ingredients.find(i => i._id === refillId);
            const newStock = (ingredientToUpdate.stock || 0) + parseFloat(refillQty);

            await updateIngredient(refillId, { stock: newStock });

            setMessage("Stock replenished successfully! 📦");
            setRefillId(null);
            setRefillQty("");
            loadData();
        } catch (err) {
            setError("Failed to update stock quantity.");
        }
    };

    const handleDeleteIngredient = async (id) => {
        if (!window.confirm("Are you sure you want to delete this raw material?")) return;
        try {
            await deleteIngredient(id);
            setMessage("Raw material deleted.");
            loadData();
        } catch (err) {
            setError("Failed to delete raw material.");
        }
    };

    if (loading) return <div style={{ padding: "40px", fontFamily: "Poppins" }}>Loading inventory data...</div>;

    return (
        <div style={{ padding: "40px", fontFamily: "Poppins" }}>
            <div style={{ marginBottom: "35px" }}>
                <h1 style={{ fontSize: "30px", fontWeight: "800", color: "var(--text)" }}>Inventory Stock</h1>
                <p style={{ color: "var(--text-light)" }}>Manage ingredients, current stock levels, and alert points.</p>
            </div>

            {message && <div style={{ padding: "12px", background: "#DCFCE7", color: "#166534", borderRadius: "8px", marginBottom: "20px" }}>{message}</div>}
            {error && <div style={{ padding: "12px", background: "#FEE2E2", color: "#991B1B", borderRadius: "8px", marginBottom: "20px" }}>{error}</div>}

            <div className={styles.grid}>

                {/* Raw Materials Table */}
                <div className={styles.card}>
                    <h3 style={{ marginBottom: "15px", color: "var(--primary-dark)" }}>Current Stock Sheets</h3>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Material</th>
                                    <th>Stock Levels</th>
                                    <th>Cost Breakdown</th>
                                    <th>Portion Rate</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredients.map((ing) => {
                                    const isLow = ing.stock <= ing.minStockAlert;
                                    return (
                                        <tr key={ing._id}>
                                            <td><strong>{ing.name}</strong></td>
                                            <td>{ing.stock} {ing.recipeUnit}</td>
                                            <td style={{ fontSize: "13px" }}>₹{ing.purchasePrice} per {ing.purchaseUnit}</td>
                                            <td><strong style={{ color: "var(--primary)" }}>₹{ing.costPerUnit} / {ing.recipeUnit}</strong></td>
                                            <td>
                                                <span style={{
                                                    background: isLow ? "#FEE2E2" : "#DCFCE7",
                                                    color: isLow ? "#991B1B" : "#166534",
                                                    padding: "4px 10px",
                                                    borderRadius: "20px",
                                                    fontSize: "12px",
                                                    fontWeight: "600"
                                                }}>
                                                    {isLow ? "Low Stock Alert" : "In Stock"}
                                                </span>
                                            </td>
                                            <td style={{ display: "flex", gap: "10px" }}>
                                                <button
                                                    onClick={() => { setRefillId(ing._id); setRefillQty(""); }}
                                                    style={{ padding: "6px 12px", background: "var(--primary-light)", color: "var(--primary-dark)", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
                                                >
                                                    Refill
                                                </button>
                                                <button onClick={() => handleDeleteIngredient(ing._id)} className={styles.btnDanger}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Dynamic Refill or Create Form */}
                <div>
                    {refillId ? (
                        <div className={styles.card} style={{ marginBottom: "20px", border: "2px solid var(--primary)" }}>
                            <h3 style={{ marginBottom: "15px", color: "var(--primary)" }}>Refill Raw Stock</h3>
                            <form onSubmit={handleRefillStock}>
                                <div className={styles.formField}>
                                    <label>Quantity to Add ({ingredients.find(i => i._id === refillId)?.recipeUnit})</label>
                                    <input type="number" step="0.01" value={refillQty} onChange={(e) => setRefillQty(e.target.value)} required />
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button type="submit" className={styles.btn} style={{ flex: 1 }}>Submit Refill</button>
                                    <button type="button" onClick={() => setRefillId(null)} style={{ padding: "12px", background: "#E2E8F0", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "600" }}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    ) : null}

                    <div className={styles.card}>
                        <h3 style={{ marginBottom: "20px", color: "var(--primary-dark)" }}>Register Raw Ingredient</h3>
                        <form onSubmit={handleAddIngredient}>

                            <div className={styles.formField}>
                                <label>Ingredient Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Sugar" />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                <div className={styles.formField}>
                                    <label>Purchase Price (₹)</label>
                                    <input type="number" step="0.01" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} required placeholder="e.g. 40" />
                                </div>
                                <div className={styles.formField}>
                                    <label>Purchase Unit</label>
                                    <input type="text" value={purchaseUnit} onChange={(e) => setPurchaseUnit(e.target.value)} required placeholder="e.g. kg" />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                <div className={styles.formField}>
                                    <label>Recipe Use Unit</label>
                                    <input type="text" value={recipeUnit} onChange={(e) => setRecipeUnit(e.target.value)} required placeholder="e.g. gm" />
                                </div>
                                <div className={styles.formField}>
                                    <label>Conversion Factor</label>
                                    <input type="number" value={conversionFactor} onChange={(e) => setConversionFactor(e.target.value)} required placeholder="e.g. 1000" />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                <div className={styles.formField}>
                                    <label>Initial Stock (in recipe unit)</label>
                                    <input type="number" step="0.01" value={initialStock} onChange={(e) => setInitialStock(e.target.value)} required placeholder="e.g. 5000" />
                                </div>
                                <div className={styles.formField}>
                                    <label>Min Alert Stock</label>
                                    <input type="number" step="0.01" value={minStockAlert} onChange={(e) => setMinStockAlert(e.target.value)} required placeholder="e.g. 500" />
                                </div>
                            </div>

                            <button type="submit" className={styles.btn} style={{ width: "100%" }}>Save Ingredient</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
