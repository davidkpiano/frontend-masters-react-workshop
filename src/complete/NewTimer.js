import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useMachine } from '@xstate/react';
import { newTimerMachine } from './newTimerMachine';
import { useRef } from 'react';

export const NewTimer = ({ onSubmit, onCancel }) => {
  const inputRef = useRef();
  const [state, send] = useMachine(newTimerMachine, {
    actions: {
      submit: (context) => {
        onSubmit(context.duration);
      },
    },
  });

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const { duration } = state.context;

  return (
    <form
      className="screen"
      data-screen="new-timer"
      data-testid="new-timer"
      onSubmit={(e) => {
        e.preventDefault();
        send(e);
      }}
    >
      <input
        type="number"
        min={0}
        step={1}
        placeholder="00s"
        onChange={send}
        title="Duration"
        ref={inputRef}
      />
      <div className="actions">
        {onCancel ? (
          <button
            type="button"
            title="Cancel"
            className="transparent"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </button>
        ) : null}

        <button
          title={`Start ${duration}-second timer`}
          hidden={duration <= 0 || undefined}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
    </form>
  );
};
