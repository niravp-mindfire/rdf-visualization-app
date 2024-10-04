import React from 'react';
import { Buffer } from 'buffer';
import Graph from './components/Graph';
import './App.css';

const App = () => {
  return (
    <div>
      <header>
        <h1>Books and Authors Visualization</h1>
      </header>
      <Graph />
    </div>
  );
};
window.Buffer = Buffer;
export default App;
