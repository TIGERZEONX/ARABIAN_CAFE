export function validateInvoice(invoice) {

    if (!invoice.customer)
        return "Customer is required";

    if (invoice.items.length === 0)
        return "Add at least one product";

    return null;

}