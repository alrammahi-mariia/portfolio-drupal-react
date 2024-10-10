import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<About />} />
        {/* <Route path="/" element={<Skills />} /> */}
        {/* <Route path="/" element={<Projects />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
