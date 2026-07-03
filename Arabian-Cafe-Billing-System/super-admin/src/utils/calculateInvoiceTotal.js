export default function calculateInvoiceTotal(items) {

    return items.reduce((total, item) => {

        const subtotal = item.qty * item.price;

        const tax = subtotal * item.tax / 100;

        return total + subtotal + tax - item.discount;

    }, 0);

}