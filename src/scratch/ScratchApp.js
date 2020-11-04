import React from 'react';
import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';

export const ScratchApp = () => {
  return (
    <div className="scratch">
      <div className="alarm">
        <div className="alarmTime">2:16 PM</div>
        <div className="alarmToggle" data-active></div>
      </div>
    </div>
  );
};
