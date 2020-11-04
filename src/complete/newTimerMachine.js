import { assign, createMachine } from 'xstate';

export const durationValid = (context) => {
  return !isNaN(context.duration) && context.duration > 0;
};

export const assignDuration = assign({
  duration: (_, event) => +event.target.value,
});

export const newTimerMachine = createMachine({
  initial: 'active',
  context: {
    duration: 0,
  },
  states: {
    active: {
      on: {
        change: {
          actions: assignDuration,
        },
        submit: {
          cond: durationValid,
          actions: 'submit',
        },
      },
    },
  },
});
