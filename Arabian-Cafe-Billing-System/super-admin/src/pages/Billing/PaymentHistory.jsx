import PaymentHistoryTable from "../../components/organisms/PaymentHistoryTable";

export default function PaymentHistory() {
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
          <h1>Payment History</h1>
          <p>Track all invoice payments and outstanding balances.</p>
        </div>

        <button
          style={{
            background: "#2563EB",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Export
        </button>
      </div>

      <PaymentHistoryTable />

    </div>
  );
}