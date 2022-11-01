import "./Controller.css";
import TimeDisplay from "./TimeDisplay";
import { useState, useEffect, Fragment } from "react";

function Controller() {
  const INITIAL_TIME = 60;
  const [time, setTime] = useState(INITIAL_TIME);
  const [reset, setReset] = useState(false);
  const [pause, setPause] = useState(true);

  const pauseHandler = () => {
    setPause(() => !pause);
  };

  const resetHandler = () => {
    setReset(() => !reset);
  };

  useEffect(() => {
    let interval = null;
    if (!pause && !reset) {
      interval = setInterval(() => {
        if (time > 0) setTime(() => time - 1);
        else {
          clearInterval(interval);
        }
      }, 1000);
    } else if (reset) {
      setTime(INITIAL_TIME);
      setReset(false);
      setPause(true);
    }
    return () => {
      clearInterval(interval);
    };
  }, [pause, reset, time]);

  return (
    <Fragment>
      <div className={`time-container ${time === 0 ? "finished" : ""}`}>
        <TimeDisplay time={time}></TimeDisplay>
      </div>
      <div className="button-container">
        <button className="control-button" onClick={resetHandler}>
          Reset
        </button>
        {time !== 0 && (
          <button className="control-button" onClick={pauseHandler}>
            {pause ? "Start" : "Pause"}
          </button>
        )}
      </div>
    </Fragment>
  );
}

export default Controller;
