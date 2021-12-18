import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
