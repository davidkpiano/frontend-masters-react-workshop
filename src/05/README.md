# Exercise 05 - Eventless Transitions

In this exercise, we'll be using [eventless transitions](https://xstate.js.org/docs/guides/transitions.html#eventless-always-transitions) to detect when the timer has expired, and simplify the guard logic.

## Goals

- Add an eventless transition in the `running` state that would transition to the `expired` state as soon as the timer expires.
- Clean up the now unnecessary guard from the `TICK` transition in the `running` state – it should only update `context.elapsed`.
