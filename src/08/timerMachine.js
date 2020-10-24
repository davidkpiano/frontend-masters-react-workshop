import { createMachine, assign } from 'xstate';

const ticker = (ctx) => (cb) => {
  const interval = setInterval(() => {
    cb('TICK');
  }, ctx.interval * 1000);
  return () => clearInterval(interval);
};

const timerExpired = (ctx) => ctx.elapsed >= ctx.duration;

// This should dynamically create a machine with the given `duration`.
export const createTimerMachine = (duration) =>
  createMachine({
    id: 'timer',
    initial: 'idle', // We want the machine to start in the 'running' state
    context: {
      duration: 60, // It's hardcoded right now; fix it
      elapsed: 0,
      interval: 0.1,
    },
    states: {
      idle: {
        entry: assign({
          duration,
          elapsed: 0,
        }),
        on: {
          TOGGLE: 'running',
          RESET: undefined,
        },
      },
      running: {
        invoke: {
          id: 'ticker', // only used for viz
          src: ticker,
        },
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
