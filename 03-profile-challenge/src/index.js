import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="avatar.jpeg" alt="Cody Iddings" />;
}

function Intro() {
  return (
    <div>
      <h1>Cody Iddings</h1>
      <p>
        I'm a co-founder of Makeshapes. We're on a mission to democratise
        high-quality team learning. Our unique approach allows organisations to
        scale learning and culture change in a way not previously possible.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      <Skill name="Surfing 🏄" />
      <Skill name="Dancing 💃" />
      <Skill name="Cooking 🍳" />
      <Skill name="Writing 🖋️" />
      <Skill name="Gaming 🎮" />
      <Skill name="Daddy 🤪" />
    </div>
  );
}

function Skill(props) {
  console.log(props);
  const bgColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  const textColor =
    parseInt(bgColor.replace("#", ""), 16) > 0xffffff / 2 ? "#000" : "#fff";
  return (
    <div
      className="skill"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <p>{props.name}</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
