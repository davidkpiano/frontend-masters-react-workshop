import { assign, createMachine } from 'xstate';

export const durationValid = (context) => {
  return context.duration > 0;
};

export const assignDuration = assign({
  duration: (_, event) => +event.target.value,
});

export const newTimerMachine = createMachine({
  initial: 'normal',
  context: {
    duration: 0,
  },
  states: {
    normal: {
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
