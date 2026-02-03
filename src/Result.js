import { useState } from "react";
import "./Result.css";

function Result() {
  // Header inputs
  const [school, setSchool] = useState("");
  const [student, setStudent] = useState("");

  // Subjects
  const [math, setMath] = useState("");
  const [english, setEnglish] = useState("");
  const [science, setScience] = useState("");
  const [socialstudies, setSocialStudies] = useState("");
  const [generalknowledge, setGeneralKnowledge] = useState("");

  // Result state
  const [result, setResult] = useState("");

  // Calculate result
  const checkResult = () => {
    const m = Number(math);
    const e = Number(english);
    const s = Number(science);
    const ss = Number(socialstudies);
    const g = Number(generalknowledge);

    if ([m, e, s].some((x) => x < 0 || x > 100 || isNaN(x))) {
      setResult("Please enter valid marks (0-100) for all subjects");
      return;
    }

    const total = m + e + s;
    const percent = (total / 500) * 100;

    let grade = "";
    if (percent >= 90) grade = "A+";
    else if (percent >= 75) grade = "A";
    else if (percent >= 60) grade = "B";
    else if (percent >= 40) grade = "C";
    else grade = "Fail";

    setResult({ total, percent: percent.toFixed(2), grade });
  };

  // Determine CSS class for grade
  const getGradeClass = (grade) => {
    if (grade === "A+" || grade === "A") return "excellent";
    else if (grade === "B") return "good";
    else if (grade === "C") return "pass";
    else return "fail";
  };

  // Emoji for grade
  const getEmoji = (grade) => {
    if (grade === "A+" || grade === "A") return "😀";
    else if (grade === "B") return "🙂";
    else if (grade === "C") return "😐";
    else return "😞";
  };

  // Reset all inputs
  const resetAll = () => {
    setSchool("");
    setStudent("");
    setMath("");
    setEnglish("");
    setScience("");
    setSocialStudies("");
    setGeneralKnowledge("");
    setResult("");
  };

  return (
    <div className="result-container">
      <h2>Student Result Analyzer</h2>

      {/* Header inputs */}
      <div className="header-inputs">
        <input
          type="text"
          placeholder="Institute Name"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
        <input
          type="text"
          placeholder="Student Name"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
        />
      </div>

      {/* Subject inputs */}
      <div className="subjects">
        <div className="subject-card">
          <label>Math</label>
          <input
            type="number"
            placeholder="0-100"
            value={math}
            onChange={(e) => setMath(e.target.value)}
          />
        </div>

        <div className="subject-card">
          <label>English</label>
          <input
            type="number"
            placeholder="0-100"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
          />
        </div>

        <div className="subject-card">
          <label>Science</label>
          <input
            type="number"
            placeholder="0-100"
            value={science}
            onChange={(e) => setScience(e.target.value)}
          />
        </div>

        <div className="subject-card">
          <label>Social Studies</label>
          <input
            type="number"
            placeholder="0-100"
            value={socialstudies}
            onChange={(e) => setSocialStudies(e.target.value)}
          />
        </div>

        <div className="subject-card">
          <label>General Knowledgw</label>
          <input
            type="number"
            placeholder="0-100"
            value={generalknowledge}
            onChange={(e) => setGeneralKnowledge(e.target.value)}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <button onClick={checkResult}>Check Result</button>
        <button onClick={resetAll}>Reset</button>
      </div>

      {/* Result display */}
      {result && typeof result !== "string" ? (
        <div className={`result-text ${getGradeClass(result.grade)}`}>
          <p className="emoji">{getEmoji(result.grade)} Grade: {result.grade}</p>
          <p>Math: {math}</p>
          <p>English: {english}</p>
          <p>Science: {science}</p>
          <p>Social Studies: {socialstudies}</p>
          <p>General Knowledge: {generalknowledge}</p>
          <p>Total: {result.total}/500</p>
          <p>Percentage: {result.percent}%</p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${result.percent}%` }}
            ></div>
          </div>
        </div>
      ) : (
        <p className="error">{result}</p>
      )}
    </div>
  );
}

export default Result;