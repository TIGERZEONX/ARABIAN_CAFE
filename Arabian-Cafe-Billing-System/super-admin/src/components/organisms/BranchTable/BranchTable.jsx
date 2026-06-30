import styles from "./BranchTable.module.css";

export default function BranchTable() {

const rows = [
"Dubai",
"Abu Dhabi",
"Sharjah",
];

return (

<div className={styles.card}>

<h3>Branches</h3>

<table>

<tbody>

{rows.map((item)=>(

<tr key={item}>

<td>{item}</td>

</tr>

))}

</tbody>

</table>

</div>

);

}