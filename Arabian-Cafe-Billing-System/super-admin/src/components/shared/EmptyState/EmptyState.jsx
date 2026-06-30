import styles from "./EmptyState.module.css";

export default function EmptyState({
  title,
  description,
}) {
  return (
    <div className={styles.box}>

      <div className={styles.icon}>
        📄
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

    </div>
  );
}