import styles from "./Answer.module.scss";

export const Answer = ({
  answerText,
  onClick,
  isSelected,
  rightAnswer,
  areAllAnswersChecked,
}) => {
  let className;
  if (areAllAnswersChecked) {
    if (rightAnswer) {
      className = styles.correctAnswer;
    } else if (isSelected) {
      className = styles.incorrectAnswer;
    }
  } else {
    if (isSelected) {
      className = styles.selectedAnswer;
    }
  }

  const className2 = areAllAnswersChecked && styles.defaultCursor;

  // only apply click event if all the answers are not checked yet
  // otherwise I don't want the selected answers to be changed
  const handleClick = () => {
    if (!areAllAnswersChecked) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick} className={`${className} ${className2}`}>
      {answerText}
    </li>
  );
};
