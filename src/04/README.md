# Exercise 04 - Guarded Transitions

In this exercise, we'll model what happens when the timer runs out using [guarded transitions](https://xstate.js.org/docs/guides/guards.html).

## Goals

- Whenever a `TICK` event happens, make it so that we only increment `context.elapsed` when incrementing it won't exceed the `context.duration`.
- Otherwise, the machine should transition to the `'expired'` state.
- Parameterize the `cond`, and optionally place it in the machine's `guards` option.
- In the `expired` state, a `RESET` event should also transition back to `idle`.
