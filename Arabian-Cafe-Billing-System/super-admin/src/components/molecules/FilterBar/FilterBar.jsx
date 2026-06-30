import styles from "./FilterBar.module.css";
import Button from "@/components/atoms/Button";

export default function FilterBar({
  children,
  onApply,
}) {
  return (
    <div className={styles.container}>

      <div className={styles.filters}>
        {children}
      </div>

      <Button
        label="Apply"
        onClick={onApply}
      />

    </div>
  );
}