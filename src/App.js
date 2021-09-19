import React from 'react'

const App = () => {
  return (
    <div className="container">
      <div className="valid-keys">
        <span className="matched">gab</span>
        <span className="remaider">riel</span>
      </div>

      <div className="typed-keys">
        asdfemerasdf
      </div>
      <div className="completed-words">
        <ol>
          <li>cidade</li>
          <li>carro</li>
          <li>profissional</li>
          <li>jogando</li>
        </ol>
      </div>
    </div>
  );
}

export default App;