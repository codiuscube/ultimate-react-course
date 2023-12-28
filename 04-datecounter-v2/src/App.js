import { useState } from "react";
import "./styles.css";
import { isVisible } from "@testing-library/user-event/dist/utils";

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const pastDate = new Date(
    Date.now() + count * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const futureDate = new Date(
    Date.now() + count * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const messages = [
    `${Math.abs(count)} days ago was ${pastDate}`,
    `Today is ${today}`,
    `${count} days from today is ${futureDate}`,
  ];

  function handlePreviousCount() {
    setCount((c) => c - step);
  }

  function handleNextCount() {
    setCount((c) => c + step);
  }

  function handleReset() {
    setStep(1);
    setCount(0);
  }

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>{step}</span>
      </div>
      <div>
        <button onClick={handlePreviousCount}>&minus;</button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        ></input>
        <button onClick={handleNextCount}>&#43;</button>
      </div>
      <div className="counter">
        {count < 0 && <div>{messages[0]}</div>}
        {count === 0 && <div>{messages[1]}</div>}
        {count > 0 && <div>{messages[2]}</div>}
      </div>
      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <div>
          <button onClick={handleReset} disabled="true">
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
