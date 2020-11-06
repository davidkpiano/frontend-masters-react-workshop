// @ts-nocheck
import * as React from 'react';
import { createModel } from '@xstate/test';
import { createMachine, assign } from 'xstate';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { App } from './complete/App';

const testTimerAppMachine = createMachine({
  initial: 'newTimer',
  context: {
    value: '',
  },
  states: {
    newTimer: {
      initial: 'noTimers',
      states: {
        noTimers: {},
        afterDeleted: {},
        adding: {},
      },
      on: {
        CHANGE: {
          actions: assign({
            value: 124,
          }),
        },
        PLAY: {
          cond: (ctx) => ctx.value > 0,
          target: 'timer',
        },
      },
      meta: {
        test: async ({ getByTestId }) => {
          getByTestId('new-timer'); // [data-testid="new-timer"]
        },
      },
    },
    timer: {
      on: {
        DELETE: 'newTimer.afterDeleted',
        ADD: 'newTimer.adding',
      },
      meta: {
        test: async ({ getByText }, state) => {
          getByText(/XState Minute Timer/i);
        },
      },
    },
  },
});

const testTimerAppModel = createModel(testTimerAppMachine).withEvents({
  CHANGE: {
    exec: async ({ getByTitle }) => {
      const input = getByTitle(/Duration/i);

      fireEvent.change(input, { target: { value: '124' } });
    },
  },
  PLAY: {
    exec: async ({ getByTitle }) => {
      const addButton = getByTitle(/Start .* timer/i);

      fireEvent.click(addButton);
    },
  },
  DELETE: {
    exec: async ({ getByTitle }) => {
      const deleteButton = getByTitle(/Delete/i);

      fireEvent.click(deleteButton);
    },
  },
  ADD: {
    exec: async ({ getByTitle }) => {
      const addButton = getByTitle(/Add/i);

      fireEvent.click(addButton);
    },
  },
});

describe('something', () => {
  const testPlans = testTimerAppModel.getSimplePathPlans();

  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      afterEach(cleanup);

      plan.paths.forEach((path) => {
        it(path.description, () => {
          const rendered = render(<App />);

          return path.test(rendered);
        });
      });
    });
  });
});
