import { useReducer } from "react";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProgressCircle } from "../ProgressCircle";
import {
  timerMachine,
  EventType,
  StateType,
  timerMachineConfig,
} from "./timerMachine";

export const Timer = () => {
  const [status, dispatch] = useReducer(
    timerMachine,
    timerMachineConfig.initial
  );

  const { duration, elapsed, interval } = {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  };

  return (
    <div
      className="timer"
      data-state={status}
      style={{
        // @ts-expect-error
        "--duration": duration,
        "--elapsed": elapsed,
        "--interval": interval,
      }}
    >
      <header>
        <h1>Exercise 00</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{status}</div>
        <div
          className="elapsed"
          onClick={() => {
            if (status === StateType.paused)
              dispatch({ type: EventType.TOGGLE });
          }}
        >
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          <button
            onClick={() => {
              dispatch({ type: EventType.RESET });
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="actions">
        {status === StateType.running ? (
          <button
            onClick={() => {
              dispatch({ type: EventType.TOGGLE });
            }}
            title="Pause timer"
          >
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch({ type: EventType.TOGGLE });
            }}
            title="Start timer"
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>
    </div>
  );
};
