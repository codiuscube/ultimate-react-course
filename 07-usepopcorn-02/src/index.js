import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <StarRating
//         color="Blue"
//         maxRating={10}
//         onSetRating={setMovieRating}
//         defaultRating={5}
//       />
//       <p>This movie was rated {movieRating} starts</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={4}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    />
    <StarRating size={24} color="#000" className="test" defaultRating={5} />
    <Test /> */}
  </React.StrictMode>
);
