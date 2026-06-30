import styles from "./FormField.module.css";
import Input from "@/components/atoms/Input";

export default function FormField({
  label,
  ...props
}) {
  return (
    <div className={styles.field}>
      <Input
        label={label}
        {...props}
      />
    </div>
  );
}