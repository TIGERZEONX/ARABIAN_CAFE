import TransactionTable from "../../components/organisms/TransactionTable";

export default function Transactions() {
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
          <h1>Transactions</h1>
          <p>View and manage all payment transactions.</p>
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

      <TransactionTable />

    </div>
  );
}