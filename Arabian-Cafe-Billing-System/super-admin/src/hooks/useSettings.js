import { useState, useEffect } from "react";
import { getTaxSettings, updateTaxSettings } from "../services/settingService";

export default function useSettings() {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    const loadSettings = async () => {
        try {
            setLoading(true);
            const res = await getTaxSettings();
            setSettings(res.data.data);
            setError(null);
        } catch (err) {
            console.error("Error loading settings:", err);
            setError(err.response?.data?.message || "Failed to load tax settings");
        } finally {
            setLoading(false);
        }
    };

    const saveSettings = async (data) => {
        try {
            setSaving(true);
            const res = await updateTaxSettings(data);
            setSettings(res.data.data);
            return res.data.data;
        } catch (err) {
            console.error("Error updating settings:", err);
            throw new Error(err.response?.data?.message || "Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    return {
        settings,
        loading,
        error,
        saving,
        refresh: loadSettings,
        saveSettings
    };
}
