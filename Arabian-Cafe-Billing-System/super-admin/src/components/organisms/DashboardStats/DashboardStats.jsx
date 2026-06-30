import styles from "./DashboardStats.module.css";
import StatusCard from "@/components/molecules/StatusCard";

export default function DashboardStats() {

const cards = [
{
title:"Revenue",
value:"₹6.4L",
status:"Paid",
},
{
title:"Bills",
value:"4210",
status:"Paid",
},
{
title:"Branches",
value:"14",
status:"Paid",
},
{
title:"Users",
value:"102",
status:"Paid",
},
];

return (

<div className={styles.grid}>

{cards.map((item) => (

<StatusCard
key={item.title}
{...item}
/>

))}

</div>

);

}