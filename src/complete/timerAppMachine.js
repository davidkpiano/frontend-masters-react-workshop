import { createMachine, assign, spawn } from 'xstate';
import { createTimerMachine } from './timerMachine';

export const timerAppMachine = createMachine({
  initial: 'new',
  context: {
    duration: 0,
    currentTimer: -1,
    timers: [],
  },
  states: {
    new: {
      on: {
        CANCEL: {
          target: 'timer',
          cond: (ctx) => ctx.timers.length > 0,
        },
      },
    },
    timer: {
      on: {
        DELETE: {
          actions: assign((ctx, e) => {
            const timers = ctx.timers.filter((_, i) => i !== e.index);
            const currentTimer = timers.length - 1;

            return {
              timers,
              currentTimer,
            };
          }),
          target: 'deleting',
        },
      },
    },
    deleting: {
      always: [
        { target: 'new', cond: (ctx) => ctx.timers.length === 0 },
        { target: 'timer' },
      ],
    },
  },
  on: {
    ADD: {
      target: '.timer',
      actions: assign((ctx, event) => {
        const newTimer = spawn(createTimerMachine(event.duration));

        const timers = ctx.timers.concat(newTimer);

        return {
          timers,
          currentTimer: timers.length - 1,
        };
      }),
    },
    CREATE: 'new',
    SWITCH: {
      actions: assign({
        currentTimer: (_, event) => event.index,
      }),
    },
  },
});
