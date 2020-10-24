import { createMachine, assign } from 'xstate';

const ticker = (context, event) => (callback) => {
  // This is the callback service creator.
  // Add the implementation details here.
  // ...
};

const timerExpired = (ctx) => ctx.elapsed >= ctx.duration;

// https://xstate.js.org/viz/?gist=78fef4bd3ae520709ceaee62c0dd59cd
export const timerMachine = createMachine({
  id: 'timer',
  initial: 'idle',
  context: {
    duration: 60,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      entry: assign({
        duration: 60,
        elapsed: 0,
      }),
      on: {
        TOGGLE: 'running',
        RESET: undefined,
      },
    },
    running: {
      // Invoke the callback service here.
      // ...

      initial: 'normal',
      states: {
        normal: {
          always: {
            target: 'overtime',
            cond: timerExpired,
          },
          on: {
            RESET: undefined,
          },
        },
        overtime: {
          on: {
            TOGGLE: undefined,
          },
        },
      },
      on: {
        TICK: {
          actions: assign({
            elapsed: (ctx) => ctx.elapsed + ctx.interval,
          }),
        },
        TOGGLE: 'paused',
        ADD_MINUTE: {
          actions: assign({
            duration: (ctx) => ctx.duration + 60,
          }),
        },
      },
    },
    paused: {
      on: { TOGGLE: 'running' },
    },
  },
  on: {
    RESET: {
      target: '.idle',
    },
  },
});
