import React, { useReducer, useState } from 'react';
import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { useEffect } from 'react/cjs/react.development';

const initialState = 'pending';

const alarmMachine = {
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
};

const alarmReducer = (state, event) => {
  const nextState = alarmMachine.states[state].on[event.type] || state;

  return nextState;
};

export const ScratchApp = () => {
  const [status, dispatch] = useReducer(alarmReducer, initialState);

  useEffect(() => {
    if (status === 'pending') {
      const timeout = setTimeout(() => {
        dispatch({ type: 'SUCCESS' });
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
            dispatch({ type: 'TOGGLE' });
          }}
        ></div>
      </div>
    </div>
  );
};
