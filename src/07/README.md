# Exercise 07 - Invoking Actors

In this exercise, we're going to move the ad-hoc interval logic that was in `useEffect` directly into the machine instead by [invoking a callback](https://xstate.js.org/docs/guides/communication.html#invoking-callbacks).

## Goals

- Create a callback service that does one thing: calls back a `'TICK'` event on each interval defined by `context.interval`. This should look very similar to `useEffect()`, so make sure to also return a cleanup function.
- In the `running` state, invoke that callback service using `invoke`. Since we're still listening for that `TICK` event, we're done!
- Remove the `useEffect(...)` from the component, since we no longer need it.
