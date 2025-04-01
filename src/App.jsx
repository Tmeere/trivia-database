import React, { useState } from "react";
import HomePage from "./HomePage";
import QuestionForm from "./QuestionForm";
import ResultsSection from "./ResultsSection";

const App = () => {
  const [formData, setFormData] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [userName, setUserName] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(""); // Store the correct answer

  const handleFormSubmit = (data) => {
    setFormData(data);
    setUserName(data.firstName);
    setIsAnswered(false);
  };

  const handleAnswerSubmit = (correct, answer) => {
    setIsAnswered(true);
    setIsCorrect(correct);
    setCorrectAnswer(answer); // Set the correct answer
  };

  const handleRestart = () => {
    setFormData(null);
    setIsAnswered(false);
  };

  const handleNextQuestion = () => {
    setIsAnswered(false);
  };

  return (
    <div>
      {!formData ? (
        <HomePage onSubmit={handleFormSubmit} />
      ) : !isAnswered ? (
        <QuestionForm
          formData={formData}
          onAnswerSubmit={handleAnswerSubmit}
        />
      ) : (
        <ResultsSection
          isCorrect={isCorrect}
          correctAnswer={correctAnswer} 
          userName={userName}
          onRestart={handleRestart}
          onNextQuestion={handleNextQuestion}
        />
      )}
    </div>
  );
};

export default App;