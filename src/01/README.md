# Exercise 01 - Using XState

In this exercise, we're going to take the machine you created and use it within [XState](https://xstate.js.org/docs) with [XState React](https://xstate.js.org/docs/packages/xstate-react/). If you created the machine using object notation, this should be pretty straightforward.

## Goals

- Install `xstate` and `@xstate/react`
- In `timerMachine.js`, use `createMachine(...)` to create a state machine in XState.
- In `Timer.js`, use the `useMachine(...)` hook with that created machine. This should feel just like `useReducer`
- The finite state value is now in `state.value`, so use that instead of `state`.
