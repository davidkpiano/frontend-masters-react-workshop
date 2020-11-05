import React, { useReducer, useState, useEffect } from 'react';
import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';

const alarmMachine = createMachine({
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TOGGLE: 'pending',
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
        TOGGLE: 'inactive',
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
          })}
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
