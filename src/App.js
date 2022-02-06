import {BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import MainLayout from "./layout/MainLayout/MainLayout";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
