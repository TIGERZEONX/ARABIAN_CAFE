import InvoiceCustomer from "../../components/organisms/InvoiceCustomer";

export default function CreateInvoice() {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Create Invoice</h1>
      <p>Create a new billing invoice.</p>

      <InvoiceCustomer />
    </div>
  );
}