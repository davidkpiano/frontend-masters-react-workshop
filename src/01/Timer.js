import * as React from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ProgressCircle } from '../ProgressCircle';

// import { useMachine } from '@xstate/react';
import { timerMachine } from './timerMachine';

export const Timer = () => {
  const [state, send] = [{}, () => {}];

  const { duration, elapsed, interval } = {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  };

  return (
    <div
      className="timer"
      data-state={state.value} // Hint!
      style={{
        // @ts-ignore
        '--duration': duration,
        '--elapsed': elapsed,
        '--interval': interval,
      }}
    >
      <header>
        <h1>Exercise 01</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{state.value}</div>
        <div
          className="elapsed"
          onClick={() => {
            // ...
          }}
        >
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          {state === 'paused' && (
            <button
              onClick={() => {
                // ...
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <div className="actions">
        {state === 'running' && (
          <button
            onClick={() => {
              // ...
            }}
            title="Pause timer"
          >
            <FontAwesomeIcon icon={faPause} />
          </button>
        )}

        {(state === 'paused' || state === 'idle') && (
          <button
            onClick={() => {
              // ...
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
