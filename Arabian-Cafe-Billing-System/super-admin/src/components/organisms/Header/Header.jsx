import styles from "./Header.module.css";
import Avatar from "@/components/atoms/Avatar";

export default function Header() {
  return (
    <header className={styles.header}>

      <div>
        Dashboard
      </div>

      <Avatar
        src="/images/user.png"
      />

    </header>
  );
}