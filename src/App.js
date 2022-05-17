import { useState, useEffect } from "react";
import { Answer } from "./components/Answer";

const App = () => {
  const [quiz, setQuiz] = useState(false);
  const [areAllAnswersChecked, setAreAllAnswersChecked] = useState(false);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([
    {
      question: "",
      correctAnswer: "",
      incorrectAnswers: [],
      userAnswer: null,
    },
  ]);

  const startQuiz = () => {
    setQuiz(true);
  };

  const fetchApi = () => {
    fetch("https://opentdb.com/api.php?amount=5&category=21&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        setQuestionsAndAnswers(
          data.results.map(
            ({
              question,
              correct_answer: correctAnswer,
              incorrect_answers: incorrectAnswers,
            }) => {
              const allAnswers = [...incorrectAnswers, correctAnswer];
              const answers = allAnswers.sort(() => Math.random() - 0.5); // shuffling answers
              return {
                question,
                correctAnswer,
                incorrectAnswers,
                answers,
                userAnswer: null,
              };
            }
          )
        );
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  // select the user's answers
  const handleSelectedAnswer = (selectedQuestion, selectedAnswer) => {
    setQuestionsAndAnswers((prevQuestionsAndAnswers) => {
      // shallow clone of the previous state
      const newQuestionsAndAnswers = [...prevQuestionsAndAnswers];
      // find the specific question the answer belongs to
      // newQuestionsAndAnswers = [a3ebc,8de7a, ...]
      const selectedQuestionAndAnswers = newQuestionsAndAnswers.find(
        // .find returns a reference for whatever object we have found inside the array of newQuestionsAndAnswers
        // selectedQuestion = a3ebc, newQuestionsAndAnswers[0] = a3ebc
        ({ question }) => question === selectedQuestion
      );
      // set the userAnswer for the previously selected question
      // through the reference we can access the property 'userAnswer' and assign it a new value
      selectedQuestionAndAnswers.userAnswer = selectedAnswer;
      // return the new state
      return newQuestionsAndAnswers;
    });
  };

  const handleAnswersChecked = () => {
    setAreAllAnswersChecked(true);
  };

  return (
    <>
      {quiz ? (
        <div className="quizPage">
          {questionsAndAnswers.map(
            ({ question, answers, correctAnswer, userAnswer }) => {
              return (
                <div className="question-answer">
                  <p className="questions">{question}</p>
                  <ul className="answers">
                    {answers.map((answer) => (
                      <Answer
                        answerText={answer}
                        onClick={() => handleSelectedAnswer(question, answer)}
                        isSelected={answer === userAnswer}
                        rightAnswer={answer === correctAnswer}
                        areAllAnswersChecked={areAllAnswersChecked}
                      />
                    ))}
                  </ul>
                </div>
              );
            }
          )}
          <button className="checkAnswersBtn" onClick={handleAnswersChecked}>
            Check Answers
          </button>
        </div>
      ) : (
        <div className="firstPage">
          <h2>Quizzical</h2>
          <button className="startQuizBtn" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      )}
      ;
    </>
  );
};

export default App;
