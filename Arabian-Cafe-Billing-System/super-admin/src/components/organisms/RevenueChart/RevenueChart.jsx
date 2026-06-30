import styles from "./RevenueChart.module.css";

export default function RevenueChart() {
  const data = [40, 65, 55, 80, 90];

  return (
    <div className={styles.card}>

      <h3>Revenue</h3>

      <div className={styles.chart}>

        {data.map((item, index) => (
          <div
            key={index}
            className={styles.bar}
            style={{
              height: `${item}%`,
            }}
          />
        ))}

      </div>

    </div>
  );
}