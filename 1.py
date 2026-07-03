import os

BASE_DIR = "src"

structure = [
    # ============================
    # BILLING PAGES
    # ============================
    "pages/Billing/BillingDashboard.jsx",
    "pages/Billing/InvoiceList.jsx",
    "pages/Billing/CreateInvoice.jsx",
    "pages/Billing/InvoiceDetails.jsx",
    "pages/Billing/Transactions.jsx",
    "pages/Billing/PaymentHistory.jsx",
    "pages/Billing/Billing.module.css",
    "pages/Billing/index.js",

    # ============================
    # ORGANISMS
    # ============================

    ## Invoice Customer
    "components/organisms/InvoiceCustomer/InvoiceCustomer.jsx",
    "components/organisms/InvoiceCustomer/InvoiceCustomer.module.css",
    "components/organisms/InvoiceCustomer/index.js",

    ## Invoice Items
    "components/organisms/InvoiceItems/InvoiceItems.jsx",
    "components/organisms/InvoiceItems/InvoiceItems.module.css",
    "components/organisms/InvoiceItems/index.js",

    ## Invoice Summary
    "components/organisms/InvoiceSummary/InvoiceSummary.jsx",
    "components/organisms/InvoiceSummary/InvoiceSummary.module.css",
    "components/organisms/InvoiceSummary/index.js",

    ## Invoice Payment
    "components/organisms/InvoicePayment/InvoicePayment.jsx",
    "components/organisms/InvoicePayment/InvoicePayment.module.css",
    "components/organisms/InvoicePayment/index.js",

    ## Invoice Notes
    "components/organisms/InvoiceNotes/InvoiceNotes.jsx",
    "components/organisms/InvoiceNotes/InvoiceNotes.module.css",
    "components/organisms/InvoiceNotes/index.js",

    ## Invoice Actions
    "components/organisms/InvoiceActions/InvoiceActions.jsx",
    "components/organisms/InvoiceActions/InvoiceActions.module.css",
    "components/organisms/InvoiceActions/index.js",

    ## Invoice Preview
    "components/organisms/InvoicePreview/InvoicePreview.jsx",
    "components/organisms/InvoicePreview/InvoicePreview.module.css",
    "components/organisms/InvoicePreview/index.js",

    ## Billing Dashboard Widgets
    "components/organisms/BillingStats/BillingStats.jsx",
    "components/organisms/BillingStats/BillingStats.module.css",
    "components/organisms/BillingStats/index.js",

    "components/organisms/BillingTable/BillingTable.jsx",
    "components/organisms/BillingTable/BillingTable.module.css",
    "components/organisms/BillingTable/index.js",

    "components/organisms/RevenueChart/RevenueChart.jsx",
    "components/organisms/RevenueChart/RevenueChart.module.css",
    "components/organisms/RevenueChart/index.js",

    "components/organisms/PaymentTable/PaymentTable.jsx",
    "components/organisms/PaymentTable/PaymentTable.module.css",
    "components/organisms/PaymentTable/index.js",

    # ============================
    # MOLECULES
    # ============================

    "components/molecules/InvoiceFilter/InvoiceFilter.jsx",
    "components/molecules/InvoiceFilter/InvoiceFilter.module.css",
    "components/molecules/InvoiceFilter/index.js",

    "components/molecules/ProductSearch/ProductSearch.jsx",
    "components/molecules/ProductSearch/ProductSearch.module.css",
    "components/molecules/ProductSearch/index.js",

    "components/molecules/InvoiceRow/InvoiceRow.jsx",
    "components/molecules/InvoiceRow/InvoiceRow.module.css",
    "components/molecules/InvoiceRow/index.js",

    "components/molecules/PaymentStatus/PaymentStatus.jsx",
    "components/molecules/PaymentStatus/PaymentStatus.module.css",
    "components/molecules/PaymentStatus/index.js",

    "components/molecules/InvoiceSummaryCard/InvoiceSummaryCard.jsx",
    "components/molecules/InvoiceSummaryCard/InvoiceSummaryCard.module.css",
    "components/molecules/InvoiceSummaryCard/index.js",

    # ============================
    # SERVICES
    # ============================

    "services/billingService.js",

    # ============================
    # HOOKS
    # ============================

    "hooks/useInvoice.js",

    # ============================
    # STORE
    # ============================

    "store/slices/billingSlice.js",

    # ============================
    # CONSTANTS
    # ============================

    "constants/billingStatus.js",
    "constants/paymentMethods.js",

    # ============================
    # UTILS
    # ============================

    "utils/calculateInvoiceTotal.js",
    "utils/calculateTax.js",
    "utils/generateInvoiceNumber.js",
    "utils/formatInvoice.js",
]


def create_structure():
    for item in structure:
        full_path = os.path.join(BASE_DIR, item)

        directory = os.path.dirname(full_path)

        os.makedirs(directory, exist_ok=True)

        if not os.path.exists(full_path):
            with open(full_path, "w", encoding="utf-8") as f:
                if full_path.endswith(".jsx"):
                    component = os.path.splitext(os.path.basename(full_path))[0]

                    if component != "index":
                        f.write(
f"""export default function {component}() {{
    return (
        <div>
            <h1>{component}</h1>
        </div>
    );
}}
"""
                        )
                elif full_path.endswith(".js"):
                    if os.path.basename(full_path) == "index.js":
                        folder = os.path.basename(directory)
                        f.write(f'export {{ default }} from "./{folder}";\n')

                elif full_path.endswith(".css"):
                    f.write("")

        print(f"✓ {full_path}")


if __name__ == "__main__":
    create_structure()
    print("\nBilling module structure created successfully.")