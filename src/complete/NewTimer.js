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
    console.log(inputRef);
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <form
      className="new-timer"
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
            className="transparent"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </button>
        ) : (
          <div></div>
        )}
        <button
          onClick={() => {}}
          title={`Start ${state.context.duration} second timer`}
        >
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
    </form>
  );
};
