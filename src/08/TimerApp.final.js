import * as React from 'react';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';
import { NewTimer } from './NewTimer.final';
import { Timer } from './Timer.final';

const timerAppMachine = createMachine({
  initial: 'new',
  context: {
    duration: 0,
  },
  states: {
    new: {
      on: {
        ADD: {
          target: 'timer',
          actions: assign({
            duration: (_, event) => event.duration,
          }),
        },
      },
    },
    timer: {
      on: {
        DELETE: 'new',
      },
    },
  },
});

export const TimerApp = () => {
  const [state, send] = useMachine(timerAppMachine);
  console.log(state);

  return (
    <main className="app" data-state={state.toStrings().join(' ')}>
      <NewTimer
        onSubmit={(duration) => {
          send({ type: 'ADD', duration });
        }}
      />
      {state.matches('timer') && (
        <Timer
          duration={state.context.duration}
          onDelete={() => {
            send('DELETE');
          }}
        />
      )}
    </main>
  );
};
