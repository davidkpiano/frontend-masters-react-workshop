import * as React from 'react';
import { useMachine } from '@xstate/react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@reach/tabs';
import { NewTimer } from './NewTimer';
import { Timer } from './Timer';
import { Clock } from './Clock';
import { timerAppMachine } from './timerAppMachine';

export const App = () => {
  const [state, send] = useMachine(timerAppMachine);
  const { timers } = state.context;

  return (
    <Tabs
      as="main"
      className="app"
      data-state={state.toStrings().join(' ')}
      defaultIndex={1}
    >
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
            {state.context.timers.map((_, index) => {
              return (
                <div
                  className="dot"
                  data-active={
                    index === state.context.currentTimer || undefined
                  }
                  key={index}
                  onClick={() => {
                    send({ type: 'SWITCH', index: index });
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
