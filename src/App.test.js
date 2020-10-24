// @ts-nocheck
import * as React from 'react';
import { createModel } from '@xstate/test';
import { createMachine, assign } from 'xstate';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { TimerApp } from './complete/TimerApp';

const testTimerAppMachine = createMachine({
  initial: 'newTimer',
  context: {
    value: '',
  },
  states: {
    newTimer: {
      on: {
        CHANGE: {
          actions: assign({
            value: 124,
          }),
        },
        ADD: {
          cond: (ctx) => ctx.value > 0,
          target: 'timer',
        },
      },
    },
    timer: {
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
  ADD: {
    exec: async ({ getByTitle }) => {
      const addButton = getByTitle(/Start .* timer/i);

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
          const rendered = render(<TimerApp />);

          return path.test(rendered);
        });
      });
    });
  });
});
