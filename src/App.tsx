import { WORDS } from "./utils/words";
import type { Challenge } from "./utils/words";
import { useEffect, useState } from "react";
import { translations } from "./utils/translations";

import { LettersUsed } from "./components/LettersUsed";
import type { LettersUsedProps } from "./components/LettersUsed";
import { Header } from "./components/Header";
import { Button } from "./components/Button";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Tip } from "./components/Tip";

import styles from "./app.module.css";

export default function App() {
  const [score, setScore] = useState(0);
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const ATTEMPTS_MARGIN = 3;

  function handleRestartGame() {
    const isConfirmed = confirm(translations[lang].restart);

    if (isConfirmed) {
      startGame();
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];

    setChallenge(randomWord);
    console.log(randomWord);

    setScore(0);
    setLettersUsed([]);
    setLetter("");
  }

  function handleConfirm() {
    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      return alert(translations[lang].empty);
    }

    const value = letter.toUpperCase();
    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value,
    );

    if (exists) {
      setLetter("");
      return alert(translations[lang].repeated);
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;

    const currentScore = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, correct: correct }]);
    setScore(currentScore);

    setLetter("");
  }

  function endGame(message: string) {
    alert(message);
    startGame();
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!challenge) {
      return;
    }

    setTimeout(() => {
      if (score === challenge.word.length) {
        return endGame(translations[lang].win);
      }

      if (lettersUsed.length === challenge.word.length + ATTEMPTS_MARGIN) {
        return endGame(translations[lang].lose);
      }
    }, 200);
  }, [score, lettersUsed.length]);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Button
          title={lang === "pt" ? "EN" : "PT"}
          onClick={() => setLang((prev) => (prev === "pt" ? "en" : "pt"))}
          className={styles.langButton}
        />
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + ATTEMPTS_MARGIN}
          onRestart={handleRestartGame}
          lang={lang}
        />
        <Tip tip={challenge.tip} />
        <div className={styles.word}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() === letter.toUpperCase(),
            );
            return (
              <Letter
                key={index}
                value={letterUsed?.value}
                color={letterUsed?.correct ? "correct" : "default"}
                index={index}
              />
            );
          })}
        </div>

        <h4 className="guessText">{translations[lang].guess}</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button title={translations[lang].confirm} onClick={handleConfirm} />
        </div>

        <LettersUsed data={lettersUsed} lang={lang} />
      </main>
    </div>
  );
}
