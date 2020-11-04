import { useMachine } from '@xstate/react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { assign, createMachine } from 'xstate';

const clockMachine = createMachine({
  initial: 'loadingTimezones',
  context: {
    timezones: null,
    timezone: null,
    time: null,
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
        noTimezoneSelected: {
          on: {},
        },
        loadingTime: {
          invoke: {
            src: (ctx) =>
              fetch(
                `http://worldtimeapi.org/api/timezone/${ctx.timezone}`
              ).then((res) => res.json()),
            onDone: {
              target: 'loaded',
              actions: assign({
                foreignTime: (_, e) => e.data.datetime,
              }),
            },
          },
        },
        loaded: {},
      },
      on: {
        'TIMEZONE.CHANGE': {
          target: '.loadingTime',
          actions: assign({
            timezone: (_, e) => e.value,
          }),
        },
        'TIMEZONE.RELOAD': '.loadingTime',
      },
    },
    timeLoaded: {
      on: {},
    },
  },
});

export function Clock() {
  const [state, send] = useMachine(clockMachine);
  const { data } = useQuery('timezones', () => {
    return fetch('http://worldtimeapi.org/api/timezone').then((data) =>
      data.json()
    );
  });

  useEffect(() => {
    if (data) {
      send({
        type: 'TIMEZONES.LOADED',
        data,
      });
    }
  }, [data, send]);

  const { timezones, foreignTime } = state.context;

  return (
    <div className="clock">
      <div className="local">
        <h1 className="localTime">{new Date().toLocaleTimeString('en-US')}</h1>
        <strong className="localDate">{new Date().toLocaleDateString()}</strong>
      </div>
      <div className="foreign">
        {(state.matches('timezonesLoaded') || timezones) && (
          <div className="foreignItem">
            <select
              className="foreignCity"
              onChange={(e) => {
                console.log(e.target.value);
                send({
                  type: 'TIMEZONE.CHANGE',
                  value: e.target.value,
                });
              }}
            >
              {state.context.timezones.map((tz) => {
                return <option key={tz}>{tz}</option>;
              })}
            </select>
            <strong className="foreignTime">
              {foreignTime && new Date(foreignTime).toLocaleTimeString('en-US')}
            </strong>
            <div className="foreignDetails">
              <button
                onClick={() => {
                  send('TIMEZONE.RELOAD');
                }}
              >
                Reload
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
