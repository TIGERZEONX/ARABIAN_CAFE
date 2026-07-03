import os

# ======================================================
# Billing Module Structure Generator
# Run this file from the project root
# Example:
# super-admin/
#     create_billing_structure.py
#     src/
# ======================================================

BASE_DIR = "src"

FILES = [

    # ==================================================
    # BILLING PAGES
    # ==================================================

    "pages/Billing/BillingDashboard.jsx",
    "pages/Billing/InvoiceList.jsx",
    "pages/Billing/CreateInvoice.jsx",
    "pages/Billing/InvoiceDetails.jsx",
    "pages/Billing/Transactions.jsx",
    "pages/Billing/PaymentHistory.jsx",
    "pages/Billing/Billing.module.css",
    "pages/Billing/index.js",

    # ==================================================
    # ORGANISMS
    # ==================================================

    "components/organisms/BillingStats/BillingStats.jsx",
    "components/organisms/BillingStats/BillingStats.module.css",
    "components/organisms/BillingStats/index.js",

    "components/organisms/BillingTable/BillingTable.jsx",
    "components/organisms/BillingTable/BillingTable.module.css",
    "components/organisms/BillingTable/index.js",

    "components/organisms/RevenueChart/RevenueChart.jsx",
    "components/organisms/RevenueChart/RevenueChart.module.css",
    "components/organisms/RevenueChart/index.js",

    "components/organisms/InvoiceCustomer/InvoiceCustomer.jsx",
    "components/organisms/InvoiceCustomer/InvoiceCustomer.module.css",
    "components/organisms/InvoiceCustomer/index.js",

    "components/organisms/InvoiceItems/InvoiceItems.jsx",
    "components/organisms/InvoiceItems/InvoiceItems.module.css",
    "components/organisms/InvoiceItems/index.js",

    "components/organisms/InvoiceSummary/InvoiceSummary.jsx",
    "components/organisms/InvoiceSummary/InvoiceSummary.module.css",
    "components/organisms/InvoiceSummary/index.js",

    "components/organisms/InvoicePayment/InvoicePayment.jsx",
    "components/organisms/InvoicePayment/InvoicePayment.module.css",
    "components/organisms/InvoicePayment/index.js",

    "components/organisms/InvoiceNotes/InvoiceNotes.jsx",
    "components/organisms/InvoiceNotes/InvoiceNotes.module.css",
    "components/organisms/InvoiceNotes/index.js",

    "components/organisms/InvoiceActions/InvoiceActions.jsx",
    "components/organisms/InvoiceActions/InvoiceActions.module.css",
    "components/organisms/InvoiceActions/index.js",

    "components/organisms/InvoicePreview/InvoicePreview.jsx",
    "components/organisms/InvoicePreview/InvoicePreview.module.css",
    "components/organisms/InvoicePreview/index.js",

    "components/organisms/PaymentTable/PaymentTable.jsx",
    "components/organisms/PaymentTable/PaymentTable.module.css",
    "components/organisms/PaymentTable/index.js",

    # ==================================================
    # MOLECULES
    # ==================================================

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

    # ==================================================
    # SERVICES
    # ==================================================

    "services/billingService.js",

    # ==================================================
    # HOOKS
    # ==================================================

    "hooks/useInvoice.js",

    # ==================================================
    # STORE
    # ==================================================

    "store/slices/billingSlice.js",

    # ==================================================
    # CONSTANTS
    # ==================================================

    "constants/billingStatus.js",
    "constants/paymentMethods.js",

    # ==================================================
    # UTILS
    # ==================================================

    "utils/calculateInvoiceTotal.js",
    "utils/calculateTax.js",
    "utils/generateInvoiceNumber.js",
    "utils/formatInvoice.js",
]


# ======================================================
# JSX TEMPLATE
# ======================================================

def jsx_template(name):
    return f"""export default function {name}() {{
    return (
        <div>
            <h1>{name}</h1>
        </div>
    );
}}
"""


# ======================================================
# INDEX TEMPLATE
# ======================================================

def index_template(folder):
    return f'export {{ default }} from "./{folder}";\n'


# ======================================================
# MAIN
# ======================================================

for file in FILES:

    full_path = os.path.join(BASE_DIR, file)

    folder = os.path.dirname(full_path)

    os.makedirs(folder, exist_ok=True)

    if os.path.exists(full_path):
        print(f"Already Exists : {full_path}")
        continue

    filename = os.path.basename(full_path)

    with open(full_path, "w", encoding="utf-8") as f:

        # JSX
        if filename.endswith(".jsx"):
            component = os.path.splitext(filename)[0]
            f.write(jsx_template(component))

        # index.js
        elif filename == "index.js":
            component = os.path.basename(folder)
            f.write(index_template(component))

        # CSS
        elif filename.endswith(".css"):
            f.write("")

        # Other JS files
        else:
            f.write("")

    print(f"Created : {full_path}")

print("\n✅ Billing module structure created successfully!")