import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Card from "./pages/Card";



function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}  />
          <Route path="/:id" element={<Card/>}  />
        </Routes>
      </Router>
    </>
  );
}

export default App
