import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route index element = {<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
