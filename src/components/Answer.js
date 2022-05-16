import styles from "./Answer.module.scss";

export const Answer = ({
  answerText,
  onClick,
  selectedAnswer,
  rightAnswer,
}) => {
  const className = selectedAnswer ? styles.selectedAnswer : null;
  return (
    <li onClick={onClick} className={className}>
      {answerText}
    </li>
  );
};
