import * as React from 'react';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import { NewTimer } from './NewTimer';
import { Timer } from './Timer';

const timerAppMachine = createMachine({
  // Create a machine that goes between the 'new' and 'timer' states
  // and also keeps track of the `duration` to pass to the <Timer />
  // component in context.
  //
  // When the <NewTimer> submits a `duration`, that "callback" should
  // be handled by the machine as an event and go to the 'timer' state.
  //
  // When the <Timer> indicates that it is deleted, that "callback"
  // should also be handled by the machine as another event
  // and go back to the 'new' state.
  // ...
});

export const TimerApp = () => {
  const [state, send] = [{}, () => {}];
  // const [state, send] = useMachine(timerAppMachine);

  return (
    <main className="app" data-state={state.value}>
      <NewTimer
        onSubmit={(duration) => {
          // ...
        }}
      />
      {/*
      Change the below to `true` to see it,
      but make sure it only shows when the state is 'timer'.
      */}
      {false && (
        <Timer
          // Change the `duration` prop to whatever <NewTimer /> submitted
          duration={60}
          onDelete={() => {
            // ...
          }}
        />
      )}
    </main>
  );
};
