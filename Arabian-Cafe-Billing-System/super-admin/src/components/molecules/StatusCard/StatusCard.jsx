import styles from "./StatusCard.module.css";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

export default function StatusCard({
  title,
  value,
  status,
}) {
  return (
    <Card>

      <div className={styles.title}>
        {title}
      </div>

      <div className={styles.value}>
        {value}
      </div>

      <Badge
        label={status}
        variant={
          status === "Paid"
            ? "active"
            : "pending"
        }
      />

    </Card>
  );
}