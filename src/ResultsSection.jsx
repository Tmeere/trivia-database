import React from "react";

// Function to decode HTML entities for results
// This ensures that any special characters in the correct answer (e.g., `&amp;`) are displayed properly
const decodeHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent || "";
};

// The ResultsSection component displays the result of the user's answer
// It shows whether the answer was correct or incorrect, the correct answer, and provides options to restart or move to the next question
const ResultsSection = ({ isCorrect, correctAnswer, userName, onRestart, }) => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {/* Header for the results section */}
      <h2>Results</h2>

      {/* Display feedback based on whether the user's answer was correct */}
      <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
        {isCorrect ? (
          // If the answer is correct, show a success message in green
          <span style={{ color: "green" }}>
            🎉 {userName}, you got it right!
          </span>
        ) : (
          // If the answer is incorrect, show an error message in red and display the correct answer
          <span style={{ color: "red" }}>
            ❌ {userName}, sorry, you were wrong. The correct answer was:{" "}
            <strong>{decodeHtml(correctAnswer)}</strong>
          </span>
        )}
      </p>

      {/* Buttons for user actions: restart the quiz or move to the next question */}
      <div style={{ marginTop: "2rem" }}>
        {/* Button to restart the quiz and return to the home page */}
        <button
          onClick={onRestart}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
           New Question?
        </button>
      </div>
    </div>
  );
};

export default ResultsSection;