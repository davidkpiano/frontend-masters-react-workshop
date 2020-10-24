import * as React from 'react';
import { useEffect } from 'react';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useMachine } from '@xstate/react';
import { ProgressCircle } from '../ProgressCircle';

import { timerMachine } from './timerMachine';

export const Timer = () => {
  const [state, send] = useMachine(timerMachine);

  const { duration, elapsed, interval } = state.context;

  useEffect(() => {
    const intervalId = setInterval(() => {
      send('TICK');
    }, interval * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="timer"
      data-state={state.toStrings().join(' ')}
      style={{
        // @ts-ignore
        '--duration': duration,
        '--elapsed': elapsed,
        '--interval': interval,
      }}
    >
      <header>
        <h1>Exercise 06</h1>
      </header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{state.toStrings().slice(-1)}</div>
        <div className="elapsed" onClick={() => send('TOGGLE')}>
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          {!state.matches({ running: 'normal' }) && (
            <button onClick={() => send('RESET')}>Reset</button>
          )}

          {state.matches({ running: 'normal' }) && (
            <button onClick={() => send('ADD_MINUTE')}>+ 1:00</button>
          )}
        </div>
      </div>
      <div className="actions">
        {state.matches({ running: 'normal' }) && (
          <button onClick={() => send('TOGGLE')} title="Pause timer">
            <FontAwesomeIcon icon={faPause} />
          </button>
        )}
        {state.matches({ running: 'overtime' }) && (
          <button onClick={() => send('RESET')} title="Reset timer">
            <FontAwesomeIcon icon={faStop} />
          </button>
        )}
        {(state.matches('paused') || state.matches('idle')) && (
          <button onClick={() => send('TOGGLE')} title="Start timer">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>
    </div>
  );
};
