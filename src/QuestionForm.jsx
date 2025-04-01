import React, { useState, useEffect } from "react";

// Function to decode HTML entities
const decodeHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.documentElement.textContent || "";
};

// Function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuestionForm = ({ formData, onAnswerSubmit }) => {
  const [question, setQuestion] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch trivia question based on user selections
    const fetchTriviaData = async () => {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=1&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const fetchedQuestion = data.results[0];
        setQuestion(fetchedQuestion);

        // Shuffle answers
        const allAnswers = shuffleArray(
          fetchedQuestion.incorrect_answers.concat(fetchedQuestion.correct_answer)
        );
        setShuffledAnswers(allAnswers);
      } else {
        setErrorMessage("Error fetching trivia question.");
      }
    };
    fetchTriviaData();
  }, [formData]);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedAnswer) {
      setErrorMessage("Please select an answer.");
    } else {
      setErrorMessage("");
      // Pass the correct answer and the result
      const isCorrect = question.correct_answer === selectedAnswer;
      onAnswerSubmit(isCorrect, question.correct_answer);
    }
  };

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      {question && (
        <>
          <h2>{decodeHtml(question.question)}</h2>
          <form onSubmit={handleSubmit}>
            {shuffledAnswers.map((answer, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={answer}
                  name="answer"
                  onChange={handleAnswerChange}
                />
                {decodeHtml(answer)}
              </label>
            ))}
            <button type="submit">Submit Answer</button>
          </form>
        </>
      )}
    </div>
  );
};

export default QuestionForm;