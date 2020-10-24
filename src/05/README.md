# Exercise 05 - Transient Transitions

In this exercise, we'll be using [transient transitions](https://xstate.js.org/docs/guides/transitions.html#transient-transitions) to detect when the timer has expired, and simplify the guard logic.

## Goals

- Add a transient transition in the `running` state that would transition to the `expired` state as soon as the timer expires.
- Clean up the now unnecessary guard from the `TICK` transition in the `running` state - it should only update `context.elapsed`.
