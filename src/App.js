import { useState, useEffect } from "react";

const App = () => {
  const [quiz, setQuiz] = useState(false);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([
    {
      question: "",
      correctAnswer: "",
      incorrectAnswers: [],
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
              };
            }
          )
        );
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      {quiz ? (
        <div className="quizPage">
          {questionsAndAnswers.map(({ question, answers }) => {
            return (
              <div className="question-answer">
                <p className="questions">{question}</p>
                <ul className="answers">
                  {answers.map((answer) => (
                    <li>{answer}</li>
                  ))}
                </ul>
              </div>
            );
          })}
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
