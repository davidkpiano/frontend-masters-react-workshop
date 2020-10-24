import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

// const durationValid = ...

// const assignDuration = ...

const newTimerMachine = createMachine({
  // Create your new timer machine here that will:
  // - keep track of the `duration` in context
  // - update the `duration` on a change event
  // - execute a "submit" action when the form is submitted
  // ...
});

export const NewTimer = ({ onSubmit }) => {
  // const [state, send] = useMachine(newTimerMachine, {
  //   actions: {
  //     // Add implementation-detail specific action(s) here
  //     // ...
  //   },
  // });

  // Delete this once you finished the above ^^
  const [state, send] = [{}, () => {}];

  return (
    <form
      className="new-timer"
      onSubmit={(e) => {
        e.preventDefault();

        // ...
      }}
    >
      <input
        type="number"
        min={0}
        step={1}
        placeholder="00s"
        autoFocus
        onChange={() => {
          // ...
        }}
      />
      <div className="actions">
        {/* Change ??? to the `duration` */}
        <button title={`Start ??? second timer`}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
    </form>
  );
};
