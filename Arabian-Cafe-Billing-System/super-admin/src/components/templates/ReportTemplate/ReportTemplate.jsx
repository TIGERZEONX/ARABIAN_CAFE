import styles from "./ReportTemplate.module.css";

export default function ReportTemplate({
  title,
  children,
}) {
  return (
    <div className={styles.report}>

      <h1>
        {title}
      </h1>

      {children}

    </div>
  );
}