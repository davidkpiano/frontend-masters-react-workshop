import { assign, createMachine } from 'xstate';

export const foreignClockMachine = createMachine({
  initial: 'loadingTimezones',
  context: {
    timezones: null,
    timezone: null,
    foreignTime: null,
  },
  states: {
    loadingTimezones: {
      on: {
        'TIMEZONES.LOADED': {
          target: 'time',
          actions: assign({
            timezones: (_, e) => e.data,
          }),
        },
      },
    },
    time: {
      initial: 'noTimezoneSelected',
      states: {
        noTimezoneSelected: {},
        timezoneSelected: {
          on: {
            'LOCAL.UPDATE': {
              actions: assign({
                foreignTime: (ctx, event) => {
                  return new Date(event.time).toLocaleTimeString('en-US', {
                    timeZone: ctx.timezone,
                  });
                },
              }),
            },
          },
        },
      },
      on: {
        'TIMEZONE.CHANGE': {
          target: '.timezoneSelected',
          actions: assign((ctx, e) => ({
            timezone: e.value,
            foreignTime: new Date().toLocaleTimeString('en-US', {
              timeZone: e.value,
            }),
          })),
        },
      },
    },
  },
});
