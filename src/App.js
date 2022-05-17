import { useState, useEffect } from "react";
import { Answer } from "./components/Answer";
import { Score } from "./components/Score";
import { CheckAnswers } from "./components/CheckAnswers";
import { nanoid } from "nanoid";

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
        // to play again, I want to clean the old answers only after the new set of questions / answers is displayed
        setAreAllAnswersChecked(false);
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

  // enables and disables the 'Check Answers' button
  // if there is at least one answer whose value is null, the button is disabled
  const notAllQuestionsAnswered = questionsAndAnswers.some(
    ({ userAnswer }) => userAnswer === null
  );

  // get the number of correct answers
  const score = questionsAndAnswers.filter(
    ({ userAnswer, correctAnswer }) => userAnswer === correctAnswer
  ).length;

  const handleNewGame = () => {
    fetchApi();
  };

  return (
    <>
      {quiz ? (
        <div className="quizPage">
          {questionsAndAnswers.map(
            ({ question, answers, correctAnswer, userAnswer }, id) => {
              return (
                <div key={id + 1} className="question-answer">
                  <p className="questions">{question}</p>
                  <ul className="answers">
                    {answers.map((answer) => (
                      <Answer
                        key={nanoid()}
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
          {areAllAnswersChecked ? (
            <Score
              score={score}
              questionsAndAnswers={questionsAndAnswers}
              onClick={handleNewGame}
            />
          ) : (
            <CheckAnswers
              onClick={handleAnswersChecked}
              disabled={notAllQuestionsAnswered}
            />
          )}
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
