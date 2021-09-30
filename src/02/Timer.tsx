import * as React from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMachine } from '@xstate/react';
import { timerMachine } from './timerMachine';
import { ProgressCircle } from '../ProgressCircle';

export const Timer = () => {
  const [state, send] = useMachine(timerMachine);

  // Use state.context instead
  const { duration, elapsed, interval } = {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  };

  return (
    <div
      className="timer"
      data-state={state.value}
      style={{
        // @ts-ignore
        '--duration': duration,
        '--elapsed': elapsed,
        '--interval': interval,
      }}
    >
      <header>
        <h1>Exercise 02</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{state.value}</div>
        <div className="elapsed" onClick={() => send({ type: 'TOGGLE' })}>
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          {state.value !== 'running' && (
            <button onClick={() => send('RESET')}>Reset</button>
          )}

          <button
            onClick={() => {
              // ...
            }}
          >
            + 1:00
          </button>
        </div>
      </div>
      <div className="actions">
        {state.value === 'running' && (
          <button onClick={() => send({ type: 'TOGGLE' })} title="Pause timer">
            <FontAwesomeIcon icon={faPause} />
          </button>
        )}

        {(state.value === 'paused' || state.value === 'idle') && (
          <button onClick={() => send({ type: 'TOGGLE' })} title="Start timer">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>
    </div>
  );
};
