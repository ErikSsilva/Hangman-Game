import logoPt from "../../assets/logo.png";
import logoEn from "../../assets/logo-en.png";
import restart from "../../assets/restart.svg";
import { translations } from "../../utils/translations";

import styles from "./styles.module.css";

type Props = {
  current: number;
  max: number;
  onRestart: () => void;
  lang: "pt" | "en";
};

export function Header({ current, max, onRestart, lang }: Props) {
  const logo = lang === "pt" ? logoPt : logoEn;
  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" />

      <header>
        <span>
          <strong>{current}</strong> {translations[lang].outOf} {max}{" "}
          {translations[lang].tries}
        </span>

        <button type="button" onClick={onRestart}>
          <img src={restart} alt="Restart icon" />
        </button>
      </header>
    </div>
  );
}
