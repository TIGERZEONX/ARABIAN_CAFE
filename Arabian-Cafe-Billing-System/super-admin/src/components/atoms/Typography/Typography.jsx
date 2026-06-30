import styles from "./Typography.module.css";

export default function Typography({
  children,
  variant = "body",
  color = "default",
  align = "left",
}) {
  const Tag =
    variant === "display"
      ? "h1"
      : variant === "h1"
      ? "h1"
      : variant === "h2"
      ? "h2"
      : variant === "h3"
      ? "h3"
      : variant === "small"
      ? "small"
      : "p";

  return (
    <Tag
      className={`
        ${styles[variant]}
        ${styles[color]}
        ${styles[align]}
      `}
    >
      {children}
    </Tag>
  );
}