import styles from "./CheckAnswers.module.scss";

export const CheckAnswers = ({ onClick, disabled }) => {
  return (
    <button
      className={disabled ? styles.disabledBtn : styles.checkAnswersBtn}
      onClick={onClick}
      disabled={disabled}
    >
      Check Answers
    </button>
  );
};
