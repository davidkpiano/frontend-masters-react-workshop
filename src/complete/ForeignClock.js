import { useMachine, useService } from '@xstate/react';
import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { LocalTimeContext } from './Clock';
import { foreignClockMachine } from './foreignClockMachine';
import mockTimezones from './timezones.json';

export function ForeignClock() {
  const localTimeService = useContext(LocalTimeContext);
  const [localTimeState] = useService(localTimeService);
  const [state, send] = useMachine(foreignClockMachine);

  const { data } = useQuery('timezones', () => {
    // return Promise.resolve(mockTimezones);
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

  useEffect(() => {
    send({
      type: 'LOCAL.UPDATE',
      time: localTimeState.context.time,
    });
  }, [localTimeState, send]);

  const { timezones, foreignTime, timezone } = state.context;

  const formattedTime = foreignTime?.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  });

  return (
    <div className="foreignItem">
      {(state.matches('timezonesLoaded') || timezones) && (
        <>
          <select
            className="foreignCity"
            onChange={(e) => {
              send({
                type: 'TIMEZONE.CHANGE',
                value: e.target.value,
              });
            }}
          >
            <option disabled selected>
              Select a timezone
            </option>
            {state.context.timezones.map((timezone) => {
              return <option key={timezone}>{timezone}</option>;
            })}
          </select>
          <strong className="foreignTime">{formattedTime || '--'}</strong>
        </>
      )}
    </div>
  );
}
