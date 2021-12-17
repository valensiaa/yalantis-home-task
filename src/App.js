import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./layout/Header/Header";
import Main from "./layout/Main/Main";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
