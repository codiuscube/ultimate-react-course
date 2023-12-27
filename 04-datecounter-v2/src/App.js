import { useState } from "react";
import "./styles.css";

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

  function handlePreviousStep() {
    setStep((s) => s - 1);
  }

  function handleNextStep() {
    setStep((s) => s + 1);
  }

  function handlePreviousCount() {
    setCount((c) => c - step);
  }

  function handleNextCount() {
    setCount((c) => c + step);
  }

  return (
    <div className="counter">
      <div>
        <button onClick={handlePreviousStep}>&minus;</button>
        <span>Step: {step}</span>
        <button onClick={handleNextStep}>&#43;</button>
      </div>
      <div>
        <button onClick={handlePreviousCount}>&minus;</button>
        <span>Count: {count}</span>
        <button onClick={handleNextCount}>&#43;</button>
      </div>
      <div className="counter">
        {count < 0 && <div>{messages[0]}</div>}
        {count === 0 && <div>{messages[1]}</div>}
        {count > 0 && <div>{messages[2]}</div>}
      </div>
    </div>
  );
}
