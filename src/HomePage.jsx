import React, { useState } from "react";

const HomePage = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    category: "",
    difficulty: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes for form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.category || !formData.difficulty) {
      setErrorMessage("All fields are required!");
    } else {
      setErrorMessage("");
      onSubmit(formData);
    }
  };

  return (
    <div>
      <h1>Welcome to the Trivia Quiz!</h1>
      <p>Test your knowledge with some fun questions.</p>

      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>

        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a Category</option>
            <option value="9">General Knowledge</option>
            <option value="11">Entertainment: Film</option>
            <option value="17">Science: Computers</option>
            <option value="22">Geography</option>
          </select>
        </label>

        <label>
          Difficulty:
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <button type="submit">Start Quiz</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default HomePage;