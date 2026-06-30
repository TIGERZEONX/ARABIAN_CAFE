import styles from "./Sidebar.module.css";

const menus = [
  "Dashboard",
  "Billing",
  "Branches",
  "Restaurants",
  "Users",
  "Reports",
  "Settings",
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>

      <div className={styles.logo}>
        ArabianCafe
      </div>

      <nav>

        {menus.map((item) => (
          <button
            key={item}
            className={styles.item}
          >
            {item}
          </button>
        ))}

      </nav>

    </aside>
  );
}