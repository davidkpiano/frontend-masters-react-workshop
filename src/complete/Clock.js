import { useMachine } from '@xstate/react';
import { createContext } from 'react';
import { clockMachine } from './clockMachine';
import { ForeignClock } from './ForeignClock';

export const LocalTimeContext = createContext();

export function Clock() {
  const [state, send, service] = useMachine(clockMachine);
  const { time } = state.context;

  return (
    <LocalTimeContext.Provider value={service}>
      <div className="clock">
        <div className="local">
          <h1 className="localTime">{time.toLocaleTimeString('en-US')}</h1>
          <strong className="localDate">{time.toLocaleDateString()}</strong>
        </div>
        <div className="foreign">
          <ForeignClock />
        </div>
      </div>
    </LocalTimeContext.Provider>
  );
}
