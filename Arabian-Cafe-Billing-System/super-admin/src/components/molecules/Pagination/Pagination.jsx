import styles from "./Pagination.module.css";
import Button from "@/components/atoms/Button";

export default function Pagination({
  page,
  total,
  next,
  prev,
}) {
  return (
    <div className={styles.pagination}>

      <Button
        label="Previous"
        variant="secondary"
        onClick={prev}
      />

      <span>
        {page} / {total}
      </span>

      <Button
        label="Next"
        onClick={next}
      />

    </div>
  );
}