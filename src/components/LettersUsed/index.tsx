import styles from "./styles.module.css";
import { translations } from "../../utils/translations";

import { Letter } from "../Letter";

export type LettersUsedProps = {
  value: string;
  correct: boolean;
};

type Props = {
  data: LettersUsedProps[];
  lang: "pt" | "en";
};

export function LettersUsed({ data, lang }: Props) {
  return (
    <div className={styles.lettersUsed}>
      <h5>{translations[lang].usedLetters}</h5>

      <div>
        {data.map(({ value, correct }) => (
          <Letter
            key={value}
            value={value}
            size="small"
            color={correct ? "correct" : "wrong"}
          />
        ))}
      </div>
    </div>
  );
}
