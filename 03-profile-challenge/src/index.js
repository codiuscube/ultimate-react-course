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

const skills = [
  {
    skill: "Surfing",
    level: "Advanced",
    color: "#2662EA",
  },
  {
    skill: "Dancing",
    level: "Beginner",
    color: "#EFD81D",
  },
  {
    skill: "Writing",
    level: "Beginner",
    color: "#C3DCAF",
  },
  {
    skill: "Cooking",
    level: "Intermediate",
    color: "#60DAFB",
  },
  {
    skill: "Gaming",
    level: "Intermediate",
    color: "#19AAFC",
  },
];

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
  const skillTree = skills;
  return (
    <div className="skill-list">
      {skills.map((skill) => (
        <Skill
          // skillObj={skill}
          skill={skill.skill}
          color={skill.color}
          level={skill.level}
          key={skill.skill}
        />
      ))}
    </div>
  );
}

function Skill({ skill, color, level }) {
  console.log({ skill, color, level });
  // const levelEmojis = {
  //   Beginner: "🌱", // Emoji for Beginner
  //   Intermediate: "🔥", // Emoji for Intermediate
  //   Advanced: "💪", // Emoji for Advanced
  // };
  // const textColor =
  //   parseInt(bgColor.replace("#", ""), 16) > 0xffffff / 2 ? "#000" : "#fff";
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <p>{skill}</p>
      <span>
        {level === "Beginner" && "🌱"}
        {level === "Intermediate" && "🔥"}
        {level === "Advanced" && "💪"}
      </span>
      {/* <span>
        {level === "Beginner"
          ? "🌱"
          : level === "Intermediate"
          ? "🔥"
          : level === "Advanced"
          ? "💪"
          : ""}
      </span> */}
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
