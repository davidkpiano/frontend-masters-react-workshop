import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

const durationValid = (context) => {
  return context.duration > 0;
};

const assignDuration = assign({ duration: (_, event) => +event.target.value });

// This is extra... ignore this unless you're curious!
const fetchRandomDuration = (context, event) => {
  return new Promise((resolve, reject) => {
    return setTimeout(() => {
      // Are you feeling lucky?
      const willFail = Math.random() < 0.2;

      if (willFail) {
        reject('Today is not your day');
      } else {
        resolve(Math.ceil(Math.random() * 100));
      }
    }, 1000);
  });
};

const logError = (_, event) => {
  console.error(event);
};

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
        FETCH: 'fetching',
        submit: {
          cond: durationValid,
          actions: 'submit',
        },
      },
    },
    fetching: {
      invoke: {
        src: fetchRandomDuration,
        onDone: {
          target: 'normal',
          actions: assign({
            duration: (_, event) => event.data,
          }),
        },
        onError: {
          target: 'normal',
          actions: logError,
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
        value={state.context.duration === 0 ? '' : state.context.duration}
        onChange={send}
      />
      <div className="actions">
        {/* <button
          onClick={() => {
            send('FETCH');
          }}
          type="button"
          className="transparent"
        >
          Get a random duration
        </button> */}
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
