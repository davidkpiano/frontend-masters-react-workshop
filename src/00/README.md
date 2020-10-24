# Exercise 00 - Creating a state machine

In this exercise, you're going to be creating a state machine from scratch, and putting it in [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer).

## Goals

- Create a state machine reducer with 3 states: `idle`, `running`, and `paused`.
  - The state machine should start in the `idle` state.
  - When a `TOGGLE` event occurs in `idle`, the machine should transition to `running`.
  - When a `TOGGLE` event occurs in `running`, the machine should transition to `paused`.
  - When a `TOGGLE` event occurs in `paused`, the machine should transition back to `running`.
  - When a `RESET` event occurs in `paused`, the machine should transition back to `idle`.
- Dispatch those `TOGGLE` events when the **Start timer** and **Pause timer** buttons are pressed. Additionally, clicking on the elapsed time should also start the timer.
- Only show the **Pause timer** button when the `state` is `'running'`.
- Only show the **Start timer** button when the state is either `paused` or `idle`.
