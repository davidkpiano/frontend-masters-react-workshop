import * as React from 'react';
import { createMachine, assign, spawn } from 'xstate';
import { useMachine } from '@xstate/react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@reach/tabs';
import { NewTimer } from './NewTimer';
import { Timer } from './Timer';
import { createTimerMachine } from './timerMachine';
import { Clock } from './Clock';

const timerAppMachine = createMachine({
  initial: 'new',
  context: {
    duration: 0,
    currentTimer: -1,
    timers: [],
  },
  states: {
    new: {
      on: {
        CANCEL: 'timer',
      },
    },
    timer: {
      on: {
        DELETE: {
          actions: assign((ctx) => {
            const timers = ctx.timers.slice(0, -1);
            const currentTimer = timers.length - 1;

            return {
              timers,
              currentTimer,
            };
          }),
          target: 'deleting',
        },
      },
    },
    deleting: {
      always: [
        { target: 'new', cond: (ctx) => ctx.timers.length === 0 },
        { target: 'timer' },
      ],
    },
  },
  on: {
    ADD: {
      target: '.timer',
      actions: assign((ctx, event) => {
        const newTimer = spawn(createTimerMachine(event.duration));

        const timers = ctx.timers.concat(newTimer);

        return {
          timers,
          currentTimer: timers.length - 1,
        };
      }),
    },
    CREATE: 'new',
    SWITCH: {
      actions: assign({
        currentTimer: (_, event) => event.index,
      }),
    },
  },
});

export const TimerApp = () => {
  const [state, send] = useMachine(timerAppMachine);
  const { timers } = state.context;

  return (
    <Tabs as="main" className="app" data-state={state.toStrings().join(' ')}>
      <TabList className="app-tabs">
        <Tab className="app-tab">Clock</Tab>
        <Tab className="app-tab">Timer</Tab>
      </TabList>
      <TabPanels className="app-panels">
        <TabPanel className="app-panel">
          <Clock />
        </TabPanel>
        <TabPanel className="app-panel">
          <NewTimer
            onSubmit={(duration) => {
              send({ type: 'ADD', duration });
            }}
            onCancel={
              timers.length
                ? () => {
                    send('CANCEL');
                  }
                : undefined
            }
            key={state.toStrings().join(' ')}
          />
          <div className="timers" hidden={!state.matches('timer')}>
            {state.context.timers.map((timer, i) => {
              return (
                <Timer
                  key={timer.id}
                  timerRef={timer}
                  onDelete={() => {
                    send('DELETE');
                  }}
                  onAdd={() => {
                    send('CREATE');
                  }}
                  data-active={i === state.context.currentTimer || undefined}
                />
              );
            })}
          </div>
          <div className="dots" hidden={!state.matches('timer')}>
            {state.context.timers.map((timer, i) => {
              return (
                <div
                  className="dot"
                  data-active={i === state.context.currentTimer || undefined}
                  key={i}
                  onClick={() => {
                    send({ type: 'SWITCH', index: i });
                  }}
                ></div>
              );
            })}
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
