import { useState } from "react";

export default function useInvoice() {

    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems(prev => [...prev, item]);
    };

    const removeItem = (index) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    const clearInvoice = () => {
        setItems([]);
    };

    return {
        items,
        addItem,
        removeItem,
        clearInvoice
    };
}