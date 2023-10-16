import { BrowserRouter, Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/update";
import "./style.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="*" element={<p>404 not found</p>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
