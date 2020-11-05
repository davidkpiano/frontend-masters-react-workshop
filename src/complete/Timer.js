import * as React from 'react';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useService } from '@xstate/react';
import { ProgressCircle } from '../ProgressCircle';

export const Timer = ({ onDelete, onAdd, timerRef, ...attrs }) => {
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
      {...attrs}
    >
      <header>
        <strong>XState Minute Timer</strong>
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
          title="Delete timer"
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
        <button
          className="transparent"
          title="Add timer"
          onClick={() => {
            onAdd();
          }}
        >
          Add Timer
        </button>
      </div>
    </div>
  );
};
