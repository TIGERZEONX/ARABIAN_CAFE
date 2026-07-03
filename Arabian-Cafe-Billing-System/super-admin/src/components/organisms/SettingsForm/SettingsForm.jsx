import { useState } from "react";
import styles from "./SettingsForm.module.css";

export default function SettingsForm({ initialSettings, onSave, saving }) {
    const [formData, setFormData] = useState({
        cafeName: initialSettings?.cafeName || "",
        address: initialSettings?.address || "",
        phone: initialSettings?.phone || "",
        gstNumber: initialSettings?.gstNumber || "",
        cgstRate: initialSettings?.cgstRate || 2.5,
        sgstRate: initialSettings?.sgstRate || 2.5,
        serviceChargeRate: initialSettings?.serviceChargeRate || 0,
        receiptHeader: initialSettings?.receiptHeader || "",
        receiptFooter: initialSettings?.receiptFooter || "",
    });

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name.endsWith("Rate") ? parseFloat(value) || 0 : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        try {
            await onSave(formData);
            setMessage("Settings updated successfully! ✅");
        } catch (err) {
            setError(err.message || "Failed to update settings ❌");
        }
    };

    return (
        <form className={styles.card} onSubmit={handleSubmit} style={{ background: "white", padding: "30px", borderRadius: "18px", boxShadow: "var(--shadow)" }}>
            {message && <div style={{ padding: "12px", background: "#DCFCE7", color: "#166534", borderRadius: "8px", marginBottom: "20px", fontWeight: "500" }}>{message}</div>}
            {error && <div style={{ padding: "12px", background: "#FEE2E2", color: "#991B1B", borderRadius: "8px", marginBottom: "20px", fontWeight: "500" }}>{error}</div>}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

                {/* Cafe Information */}
                <div style={{ gridColumn: "span 2" }}>
                    <h4 style={{ borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "15px", color: "var(--primary-dark)" }}>Café Profile</h4>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "14px", marginBottom: "8px", fontWeight: "500" }}>Café Name</label>
                    <input type="text" name="cafeName" value={formData.cafeName} onChange={handleChange} required style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "12px" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "14px", marginBottom: "8px", fontWeight: "500" }}>Contact Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "12px" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gridColumn: "span 2" }}>
                    <label style={{ fontSize: "14px", marginBottom: "8px", fontWeight: "500" }}>Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows="2" style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "12px", fontFamily: "Poppins" }} />
                </div>

                {/* Taxes and GST */}
                <div style={{ gridColumn: "span 2", marginTop: "15px" }}>
                    <h4 style={{ borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "15px", color: "var(--primary-dark)" }}>Taxation & GST Rates</h4>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "14px", marginBottom: "8px", fontWeight: "500" }}>GSTIN (GST Number)</label>
                    <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "12px" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "14px", marginBottom: "8px", fontWeight: "500" }}>Service Charge (%)</label>
                    <input type="number" step="0.1" name="serviceChargeRate" value={formData.serviceChargeRate} onChange={handleChange} style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "12px" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "14px", marginBottom: "8px", fontWeight: "500" }}>CGST Rate (%)</label>
                    <input type="number" step="0.05" name="cgstRate" value={formData.cgstRate} onChange={handleChange} required style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "12px" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "14px", marginBottom: "8px", fontWeight: "500" }}>SGST Rate (%)</label>
                    <input type="number" step="0.05" name="sgstRate" value={formData.sgstRate} onChange={handleChange} required style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "12px" }} />
                </div>

                {/* Receipt Headers/Footers */}
                <div style={{ gridColumn: "span 2", marginTop: "15px" }}>
                    <h4 style={{ borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "15px", color: "var(--primary-dark)" }}>Thermal Printer Receipt Layout</h4>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "14px", marginBottom: "8px", fontWeight: "500" }}>Receipt Header Welcome Text</label>
                    <input type="text" name="receiptHeader" value={formData.receiptHeader} onChange={handleChange} style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "12px" }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "14px", marginBottom: "8px", fontWeight: "500" }}>Receipt Footer Thankyou Text</label>
                    <input type="text" name="receiptFooter" value={formData.receiptFooter} onChange={handleChange} style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "12px" }} />
                </div>

            </div>

            <div style={{ marginTop: "30px", display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" disabled={saving} style={{ padding: "14px 30px", background: "var(--primary)", color: "white", border: "none", borderRadius: "14px", fontWeight: "600", cursor: "pointer" }}>
                    {saving ? "Saving Changes..." : "Save Settings"}
                </button>
            </div>
        </form>
    );
}
