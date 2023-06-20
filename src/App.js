import React from "react";

import "./index.scss";

function App() {
  const [counter, SetCounter] = React.useState(0);

  const onPlusClick = () => {
    SetCounter(counter + 1);
  };

  const onMinusClick = () => {
    SetCounter(counter - 1);
  };

  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{counter}</h1>
        <button onClick={onMinusClick} className="minus">
          - Минус
        </button>
        <button onClick={onPlusClick} className="plus">
          Плюс +
        </button>
      </div>
    </div>
  );
}

export default App;
