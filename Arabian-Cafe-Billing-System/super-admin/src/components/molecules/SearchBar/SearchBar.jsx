import styles from "./SearchBar.module.css";
import Input from "@/components/atoms/Input";

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
}) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>
        🔍
      </span>

      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}