import React from "react";
import ReactDOM from "react-dom";
import Hero from "./hero";

const App = () => {
  return (
    <div className="container">
      <Hero />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
