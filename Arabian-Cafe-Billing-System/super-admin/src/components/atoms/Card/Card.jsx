import styles from "./Card.module.css";

export default function Card({
  children,
  title,
  value,
  footer,
}) {
  return (
    <div className={styles.card}>

      {title && (
        <div className={styles.label}>
          {title}
        </div>
      )}

      {value && (
        <div className={styles.value}>
          {value}
        </div>
      )}

      {children}

      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}

    </div>
  );
}