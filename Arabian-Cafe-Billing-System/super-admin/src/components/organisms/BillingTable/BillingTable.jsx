import styles from "./BillingTable.module.css";
import TableRow from "@/components/molecules/TableRow";

export default function BillingTable() {

const rows = [
{
id:"INV001",
branch:"Dubai",
amount:"₹25000",
status:"Paid",
},
{
id:"INV002",
branch:"Abu Dhabi",
amount:"₹12000",
status:"Pending",
},
];

return (

<div className={styles.wrapper}>

<table>

<thead>

<tr>

<th>ID</th>

<th>Branch</th>

<th>Amount</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{rows.map((row)=>(

<TableRow
key={row.id}
{...row}
/>

))}

</tbody>

</table>

</div>

);

}