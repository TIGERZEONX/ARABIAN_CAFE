import styles from "./Avatar.module.css";

export default function Avatar({
  src,
  alt = "avatar",
  size = "md",
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`
        ${styles.avatar}
        ${styles[size]}
      `}
    />
  );
}