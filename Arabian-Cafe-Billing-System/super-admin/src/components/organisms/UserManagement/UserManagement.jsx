import styles from "./UserManagement.module.css";
import Button from "@/components/atoms/Button";

export default function UserManagement() {

const users = [
"Admin",
"Manager",
"Staff",
];

return (

<div className={styles.card}>

<div className={styles.header}>

<h3>Users</h3>

<Button label="Add User"/>

</div>

{users.map((user)=>(

<div
key={user}
className={styles.user}
>

{user}

</div>

))}

</div>

);

}