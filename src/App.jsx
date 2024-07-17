import React from "react";
import UserForm from "./UserForm";
import "./App.css";
import eyes from "./eyes.gif";

function App() {
  return (
    <div className="App">
      <div className="center-container App-header">
        <header className="App-header">
          <h1>BitlyRevealer</h1>
        </header>
        <main className="main-content">
          <img src={eyes} alt="Animated GIF" className="eyesSize" />
          <div className="form-container">
            <UserForm />
          </div>
        </main>
        <footer className="footer">
          <div className="copyright">&copy; Barnett Fischer, 2024</div>
        </footer>
      </div>
    </div>
  );
}

export default App;
