// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [submitted, setSubmitted] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [studentProgress, setStudentProgress] = useState({
    name: "",
    hours: "",
    progress: "",
  });

  const handleLoginChange = (e) => {
    console.log(login)
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleStudentProgressChange = (e) => {
    console.log(studentProgress)
    setStudentProgress({
      ...studentProgress,
      [e.target.name]: e.target.value,
    });
  };

  const checkCredentials = async (event) => {
    try {
      event.preventDefault();
      // Axios request to the backend for checking credentials
     console.log(login)
      const response = await axios.post(
        "http://localhost:3001/api/check-credentials",
        {
          login,
        }
      );
      setAuthenticated(response.data.validCredentials);
    } catch (error) {
      console.error("Error checking credentials:", error.message);
    }
  };

  const submitAnswers = async (event) => {
    try {
      // Axios request to the backend for submitting answers
      // If validCredentials is true, proceed to submission
      event.preventDefault();
      console.log(studentProgress);
      const response = await axios.post(
        "http://localhost:3001/api/submit-answers",
        {
          studentProgress,
        }
      );
      console.log(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  return (
    <form onSubmit={submitAnswers}>
      <div>
        {!authenticated ? (
          <div>
            <h1>Login</h1>
            <label>Email: </label>
            <input type="text" name="email" value={login.email} onChange={handleLoginChange} />
            <br />
            <label>Password: </label>
            <input type="password" name="password" value={login.password} onChange={handleLoginChange} />
            <br />
            <button onClick={checkCredentials}>Submit</button>
          </div>
        ) : !submitted ? (
          <div>
            <h1>Student Progress</h1>
            <label>Name: </label>
            <input type="text" name="name" value={studentProgress.name} onChange={handleStudentProgressChange} />
            <br />
            <label>Hours of Study: </label>
            <input type="text" name="hours" value={studentProgress.hours} onChange={handleStudentProgressChange} />
            <br />
            <label>Progress: </label>
            <input type="text" name="progress" value={studentProgress.progress} onChange={handleStudentProgressChange} />
            <br />
            <button type="submit">Submit</button>
          </div>
        ) : (
          <div>
            <h1>Thank You!</h1>
          </div>
        )}
      </div>
    </form>
  );
};

export default Form;
