import React, { useEffect } from 'react';
import { createMachine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

const alarmMachine = createMachine({
  initial: 'inactive',
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: 'pending',
          actions: assign({
            count: (context, event) => {
              return context.count + 1;
            },
          }),
        },
      },
    },
    pending: {
      on: {
        SUCCESS: 'active',
        TOGGLE: 'inactive',
      },
    },
    active: {
      on: {
        TOGGLE: {
          target: 'inactive',
          actions: [],
        },
      },
    },
  },
});

export const ScratchApp = () => {
  const [state, send] = useMachine(alarmMachine);

  const status = state.value;

  useEffect(() => {
    if (status === 'pending') {
      const timeout = setTimeout(() => {
        send('SUCCESS');
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [status]);

  return (
    <div className="scratch">
      <div className="alarm">
        <div className="alarmTime">
          {new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}{' '}
          ({state.context.count})
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
    </div>
  );
};
