import React from 'react';
import ChessGrid from './components/ChessGrid/';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chess Table</h1>
        <ChessGrid />
      </header>
    </div>
  );
}

export default App;
