import styles from "./Score.module.scss";

export const Score = ({ score, questionsAndAnswers, onClick }) => {
  return (
    <div className={styles.scoreAndPlayAgain}>
      <p>
        You scored {score}/{questionsAndAnswers.length} correct Answers
      </p>
      <button className={styles.playAgain} onClick={onClick}>
        Play Again
      </button>
    </div>
  );
};
