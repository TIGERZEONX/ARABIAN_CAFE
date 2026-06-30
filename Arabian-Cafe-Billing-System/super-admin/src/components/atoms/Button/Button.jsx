import styles from "./Button.module.css";

export default function Button({
  label,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  icon,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.btn} ${styles[variant]}`}
    >
      {icon && (
        <span className={styles.icon}>
          {icon}
        </span>
      )}

      {label}
    </button>
  );
}