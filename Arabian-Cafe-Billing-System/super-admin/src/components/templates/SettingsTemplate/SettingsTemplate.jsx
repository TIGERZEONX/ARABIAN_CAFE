import styles from "./SettingsTemplate.module.css";

export default function SettingsTemplate({
  children,
}) {
  return (
    <div className={styles.settings}>

      {children}

    </div>
  );
}