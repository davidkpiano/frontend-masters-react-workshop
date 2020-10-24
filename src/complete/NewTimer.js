import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

const durationValid = (context) => {
  return context.duration > 0;
};

const assignDuration = assign({ duration: (_, event) => +event.target.value });

const newTimerMachine = createMachine({
  initial: 'normal',
  context: {
    duration: 0,
  },
  states: {
    normal: {
      on: {
        change: {
          actions: assignDuration,
        },
        submit: {
          cond: durationValid,
          actions: 'submit',
        },
      },
    },
  },
});

export const NewTimer = ({ onSubmit }) => {
  const [state, send] = useMachine(newTimerMachine, {
    actions: {
      submit: (context) => {
        onSubmit(context.duration);
      },
    },
  });

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
        autoFocus
        onChange={send}
        title="Duration"
      />
      <div className="actions">
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
