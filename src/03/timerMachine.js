import { createMachine, assign } from 'xstate';

// Parameterize the assign actions here:
// const tick = ...
// const addMinute = ...
// const reset = ...

export const timerMachine = createMachine({
  initial: 'idle',
  context: {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      // Parameterize this action:
      entry: assign({
        duration: 60,
        elapsed: 0,
      }),

      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      on: {
        // On the TICK event, the context.elapsed should be incremented by context.interval
        // ...

        TOGGLE: 'paused',
        ADD_MINUTE: {
          // Parameterize this action:
          actions: assign({
            duration: (ctx) => ctx.duration + 60,
          }),
        },
      },
    },
    paused: {
      on: {
        TOGGLE: 'running',
        RESET: 'idle',
      },
    },
  },
});
