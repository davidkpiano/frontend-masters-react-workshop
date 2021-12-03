import React from 'react';
import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';

export const ScratchApp = () => {
  return (
    <div className="scratch">
      <div className="alarm">
        <div className="alarmTime">
          {new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
        <div className="alarmToggle" data-active></div>
      </div>
    </div>
  );
};
