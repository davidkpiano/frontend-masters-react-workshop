import * as React from 'react';
import { useMemo } from 'react';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMachine, useService } from '@xstate/react';

import { createTimerMachine } from './timerMachine';
import { ProgressCircle } from '../ProgressCircle';

export const Timer = ({ onDelete, timerRef }) => {
  const [state, send] = useService(timerRef);

  const { duration, elapsed, interval } = state.context;

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
        <a
          href="https://xstate.js.org/viz/?gist=78fef4bd3ae520709ceaee62c0dd59cd"
          title="See the visualization"
          target="_xstate"
        >
          XState Minute Timer
        </a>
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
        <button
          className="transparent"
          onClick={() => {
            onDelete();
          }}
        >
          Delete
        </button>
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
