import useSettings from "../../hooks/useSettings";
import SettingsForm from "../../components/organisms/SettingsForm/SettingsForm";

export default function General() {
    const { settings, loading, error, saving, saveSettings } = useSettings();

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", fontFamily: "Poppins" }}>
                <h3>Loading configuration settings...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: "40px", color: "var(--danger)", fontFamily: "Poppins" }}>
                <h3>Error: {error}</h3>
            </div>
        );
    }

    return (
        <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto", fontFamily: "Poppins" }}>
            <div style={{ marginBottom: "30px" }}>
                <h1 style={{ fontSize: "30px", fontWeight: "800", color: "var(--text)" }}>Store Settings</h1>
                <p style={{ color: "var(--text-light)" }}>Moderate your cafe profile, receipt layout, and tax/GST parameters.</p>
            </div>

            <SettingsForm
                initialSettings={settings}
                onSave={saveSettings}
                saving={saving}
            />
        </div>
    );
}
