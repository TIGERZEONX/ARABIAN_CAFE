import BillingTable from "../../components/organisms/BillingTable";

export default function InvoiceList() {
  return (
    <div style={{ padding: "24px" }}>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1>Invoice List</h1>
          <p>Manage all customer invoices.</p>
        </div>

        <button
          style={{
            padding: "10px 18px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Create Invoice
        </button>
      </div>

      <BillingTable />

    </div>
  );
}