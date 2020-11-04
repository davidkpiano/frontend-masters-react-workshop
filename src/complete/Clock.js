import { useMachine } from '@xstate/react';
import { createContext } from 'react';
import { assign, createMachine } from 'xstate';
import { ForeignClock } from './ForeignClock';

const clockMachine = createMachine({
  initial: 'active',
  context: {
    time: Date.now(),
    offset: new Date().getTimezoneOffset() * -60,
  },
  states: {
    active: {
      invoke: {
        id: 'interval',
        src: () => (sendBack) => {
          const interval = setInterval(() => {
            sendBack('TICK');
          }, 1000);

          return () => {
            clearInterval(interval);
          };
        },
      },
      on: {
        TICK: {
          actions: assign({
            time: () => Date.now(),
          }),
        },
      },
    },
  },
});

export const LocalTimeContext = createContext();

export function Clock() {
  const [state, send, service] = useMachine(clockMachine);
  const { time } = state.context;

  return (
    <LocalTimeContext.Provider value={service}>
      <div className="clock">
        <div className="local">
          <h1 className="localTime">
            {new Date(time).toLocaleTimeString('en-US')}
          </h1>
          <strong className="localDate">
            {new Date(time).toLocaleDateString()}
          </strong>
        </div>
        <div className="foreign">
          <ForeignClock />
        </div>
      </div>
    </LocalTimeContext.Provider>
  );
}
