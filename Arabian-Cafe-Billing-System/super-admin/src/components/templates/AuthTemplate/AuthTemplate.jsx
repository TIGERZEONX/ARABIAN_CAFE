import styles from "./AuthTemplate.module.css";

export default function AuthTemplate({
  children,
}) {
  return (
    <div className={styles.wrapper}>

      <div className={styles.card}>

        {children}

      </div>

    </div>
  );
}