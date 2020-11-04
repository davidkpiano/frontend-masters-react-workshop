import { useMachine, useService } from '@xstate/react';
import { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { LocalTimeContext } from './Clock';
import { foreignClockMachine } from './foreignClockMachine';

export function ForeignClock() {
  const localTimeService = useContext(LocalTimeContext);
  const [localTimeState] = useService(localTimeService);
  const [state, send] = useMachine(foreignClockMachine);

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

  useEffect(() => {
    send({
      type: 'LOCAL.UPDATE',
      time: localTimeState.context.time,
      localOffset: localTimeState.context.offset,
    });
  }, [localTimeState, send]);

  const { timezones, timezone, foreignTime } = state.context;

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
            <option>Select a timezone</option>
            {state.context.timezones.map((tz) => {
              return <option key={tz}>{tz}</option>;
            })}
          </select>
          <strong className="foreignTime">{foreignTime || '...'}</strong>
          <div className="foreignDetails">Great!</div>
        </>
      )}
    </div>
  );
}
