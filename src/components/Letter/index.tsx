import styles from "./styles.module.css";

type Props = {
  value?: string;
  size?: "default" | "small";
  color?: "default" | "correct" | "wrong";
  index?: number;
};

export function Letter({
  value = "",
  size = "default",
  color = "default",
  index = 0,
}: Props) {
  return (
    <div
      className={`
        ${styles.letter} 
        ${size === "small" && styles.letterSmall} 
        ${color === "correct" && styles.letterCorrect}
        ${color === "wrong" && styles.letterWrong}`}
      style={{ "--i": index } as React.CSSProperties}
    >
      <span>{value}</span>
    </div>
  );
}
