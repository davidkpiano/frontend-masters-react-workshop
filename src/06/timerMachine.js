import { createMachine, assign } from 'xstate';

const timerExpired = (ctx) => ctx.elapsed >= ctx.duration;

export const timerMachine = createMachine({
  initial: 'idle',
  context: {
    duration: 5,
    elapsed: 0,
    interval: 0.1,
  },
  states: {
    idle: {
      entry: assign({
        duration: 5,
        elapsed: 0,
      }),
      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      // Add the `normal` and `overtime` nested states here.
      // Don't forget to add the initial state (`normal`)!
      // ...

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
      on: {
        TOGGLE: 'running',
      },
    },
  },
  on: {
    RESET: {
      target: '.idle',
    },
  },
});
