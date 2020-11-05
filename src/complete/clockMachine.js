import { assign, createMachine } from 'xstate';

export const clockMachine = createMachine({
  id: 'clock',
  initial: 'active',
  context: {
    time: new Date(),
  },
  states: {
    active: {
      invoke: {
        id: 'interval',
        src: () => (sendBack) => {
          const interval = setInterval(() => {
            sendBack({
              type: 'TICK',
              time: new Date(),
            });
          }, 1000);

          return () => {
            clearInterval(interval);
          };
        },
      },
      on: {
        TICK: {
          actions: assign({
            time: (_, event) => event.time,
          }),
        },
      },
    },
  },
});
