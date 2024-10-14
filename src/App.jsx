import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import "bootstrap-icons/font/bootstrap-icons.css";
import Layout from "./pages/Layout";
import Contact from "./components/Contact";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
