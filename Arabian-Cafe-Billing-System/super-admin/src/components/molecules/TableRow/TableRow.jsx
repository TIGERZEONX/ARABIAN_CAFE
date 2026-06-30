import styles from "./TableRow.module.css";
import Badge from "@/components/atoms/Badge";

export default function TableRow({
  id,
  branch,
  amount,
  status,
}) {
  return (
    <tr className={styles.row}>

      <td>{id}</td>

      <td>{branch}</td>

      <td>{amount}</td>

      <td>
        <Badge
          label={status}
          variant={
            status === "Paid"
              ? "active"
              : "pending"
          }
        />
      </td>

    </tr>
  );
}