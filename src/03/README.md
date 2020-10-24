# Exercise 03 - Parameterizing Actions

In this exercise, we'll move those actions created with `assign(...)` to parameterized actions. We'll also model a `TICK` event using `useEffect` and `setInterval`, for now.

## Goals

- Move all of the `assign(...)` actions to functions.
- When in the `'running'` state, a `TICK` event should increment the `context.elapsed` value by the `context.interval`.
- Add a `useEffect` to start that interval. Ideally, the interval should start and stop whenever we're in and out of the `running` state respectively.
