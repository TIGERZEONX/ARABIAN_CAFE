import styles from "./DashboardTemplate.module.css";

import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

export default function DashboardTemplate({
  children,
}) {
  return (
    <div className={styles.layout}>


      <main className={styles.content}>

        <Header />

        {children}

      </main>

    </div>
  );
}