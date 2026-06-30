import styles from "./Input.module.css";

export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  disabled = false,
  error,
}) {
  return (
    <div className={styles.field}>

      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}

      <input
        className={`
          ${styles.input}
          ${error ? styles.error : ""}
        `}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />

      {error && (
        <span className={styles.message}>
          {error}
        </span>
      )}

    </div>
  );
}