import { createMachine, assign } from 'xstate';

export const timerMachine = createMachine({
  initial: 'idle',
  // Add initial context
  // ...

  states: {
    idle: {
      // Reset duration and elapsed on entry
      // ...

      on: {
        TOGGLE: 'running',
      },
    },
    running: {
      on: {
        TOGGLE: 'paused',

        // On ADD_MINUTE, increment context.duration by 60 seconds
        // ...
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
