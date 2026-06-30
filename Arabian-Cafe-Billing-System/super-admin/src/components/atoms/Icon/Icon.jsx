import styles from "./Icon.module.css";

export default function Icon({
  children,
  size = "md",
}) {
  return (
    <span
      className={`
        ${styles.icon}
        ${styles[size]}
      `}
    >
      {children}
    </span>
  );
}