import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [time, setTime] = useState({ hr: 0, min: 0, sec: 0 });
  useEffect(() => {
    handleTime();
    return () => clearInterval(ref.current);
  }, []);

  let ref = useRef();

  function handleTime() {
    ref.current = setInterval(() => {
      setTime((prev) => {
        if (prev.sec == 60) {
          return { ...prev, min: prev.min + 1, sec: 0 };
        }
        if (prev.min == 60) {
          return { ...prev, hr: prev.hr + 1, min: 0, sec: 0 }
        }
        return { ...prev, sec: prev.sec + 1 };
      });
    }, 1000);
  }

  return (
    <div className="App">
      <div>
        <h1>{time.hr.toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}:
          {time.min.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}:
          {time.sec.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}</h1>
      </div>
      <button onClick={() => handleTime()}>Start</button>
      <button onClick={() => clearInterval(ref.current)}>Pause</button>
      <button onClick={() => {
        clearInterval(ref.current);
        setTime(0)
      }}>Reset</button>
    </div>
  );
}

export default App;
