import * as React from 'react';
import { useEffect } from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMachine } from '@xstate/react';
import { ProgressCircle } from '../ProgressCircle';

import { timerMachine } from './timerMachine';

export const Timer = () => {
  const [state, send] = useMachine(timerMachine);

  const { duration, elapsed, interval } = state.context;

  // Add a useEffect(...) here to send a TICK event on every `interval`
  // ...

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
        <h1>Exercise 03</h1>
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

          {state.value === 'running' && (
            <button onClick={() => send('ADD_MINUTE')}>+ 1:00</button>
          )}
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
