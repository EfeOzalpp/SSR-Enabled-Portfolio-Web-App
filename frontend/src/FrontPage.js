// src/Frontpage.js
import logo from './logo.svg';
import './Frontpage.css';

function Frontpage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/Frontpage.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reactss
        </a>
      </header>
    </div>
  );
}

export default Frontpage;
