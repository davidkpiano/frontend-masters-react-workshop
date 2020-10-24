import * as React from 'react';
import { createMachine, assign, spawn } from 'xstate';
import { useMachine } from '@xstate/react';
import { NewTimer } from './NewTimer';
import { Timer } from './Timer';
import { createTimerMachine } from './timerMachine';

const timerAppMachine = createMachine({
  initial: 'new',
  context: {
    duration: 0,
    timers: [],
  },
  states: {
    new: {},
    timer: {
      on: {
        DELETE: 'new',
      },
    },
  },
  on: {
    ADD: {
      target: '.timer',
      actions: assign({
        timers: (ctx) => {
          const newTimer = spawn(createTimerMachine(60));

          return ctx.timers.concat(newTimer);
        },
      }),
    },
  },
});

export const TimerApp = () => {
  const [state, send] = useMachine(timerAppMachine);

  console.log(state.context);

  return (
    <main className="app" data-state={state.toStrings().join(' ')}>
      <NewTimer
        onSubmit={(duration) => {
          send({ type: 'ADD', duration });
        }}
      />
      {state.context.timers.map((timer) => {
        return (
          <Timer
            timerRef={timer}
            onDelete={() => {
              send('DELETE');
            }}
          />
        );
      })}
      {/* {state.matches('timer') && (
        <Timer
          duration={state.context.duration}
          onDelete={() => {
            send('DELETE');
          }}
        />
      )}{' '} */}
      <button
        className="transparent"
        style={{ position: 'absolute' }}
        onClick={() => send('ADD')}
      >
        Add Timer
      </button>
    </main>
  );
};
