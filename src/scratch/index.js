import React, { useEffect } from 'react';
import { createMachine, assign, spawn, sendParent } from 'xstate';
import { useMachine, useService } from '@xstate/react';

const incrementCount = assign({
  count: (context, event) => {
    return context.count + 1;
  },
});

const notTooMuch = (context, event) => {
  return context.count < 5;
};

const greetMachine = createMachine({
  initial: 'unknown',
  states: {
    unknown: {
      always: [
        {
          cond: () => {
            return new Date().getHours() < 12;
          },
          target: 'morning',
        },
        { target: 'day' },
      ],
    },
    morning: {},
    day: {},
  },
});

const saveAlarm = async () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(100);
    }, 2000);
  });
};

const alarmMachine = createMachine(
  {
    initial: 'inactive',
    context: {
      count: 0,
    },
    states: {
      inactive: {
        on: {
          TOGGLE: [
            {
              target: 'pending',
              actions: 'increment',
              cond: 'notTooMuch',
            },
            {
              target: 'rejected',
            },
          ],
        },
      },
      pending: {
        invoke: {
          id: 'timeout',
          src: (context, event) => (sendBack, receive) => {
            receive((event) => {
              console.log(event);
            });

            const timeout = setTimeout(() => {
              sendBack({
                type: 'SUCCESS',
              });
            }, 2000);

            return () => {
              clearTimeout(timeout);
            };
          },
          onError: 'rejected',
        },
        on: {
          SUCCESS: 'active',
          TOGGLE: {
            target: 'inactive',
          },
        },
      },
      active: {
        entry: sendParent('ACTIVE'),
      },
      rejected: {},
    },
  },
  {
    actions: {
      increment: incrementCount,
    },
    guards: {
      notTooMuch,
    },
  }
);

const Alarm = ({ alarmRef }) => {
  const [state, send] = useService(alarmRef);

  const status = state.value;
  const { count } = state.context;

  return (
    <div className="alarm">
      <div className="alarmTime">
        {new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        })}{' '}
        ({count}) ({state.toStrings().join(' ')})
      </div>
      <div
        className="alarmToggle"
        data-active={status === 'active' || undefined}
        style={{
          opacity: status === 'pending' ? 0.5 : 1,
        }}
        onClick={() => {
          send('TOGGLE');
        }}
      ></div>
    </div>
  );
};

const alarmsMachine = createMachine({
  context: {
    alarms: [],
  },
  initial: 'active',
  states: {
    active: {
      on: {
        ADD_ALARM: {
          actions: assign({
            alarms: (context, event) => {
              const alarm = spawn(alarmMachine);

              return context.alarms.concat(alarm);
            },
          }),
        },
        ACTIVE: {
          actions: (context, event) => {
            console.log('Received', event);
          },
        },
      },
    },
  },
});

export const ScratchApp = () => {
  const [state, send] = useMachine(alarmsMachine);

  return (
    <div className="scratch">
      <button onClick={() => send('ADD_ALARM')}>Add Alarm</button>
      {state.context.alarms.map((alarm, i) => {
        return <Alarm alarmRef={alarm} key={i} />;
      })}
    </div>
  );
};
