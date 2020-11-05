# Exercise 02 - Context

In this exercise, we're going to use `context` to hold extended state (state that isn't finite) and `assign(...)` to update `context` in an action.

## Goals

- Add initial `context` to the machine with these values:
  - `duration: 60` (seconds)
  - `elapsed: 0` (seconds)
  - `interval: 0.1` (seconds - 1/10th of a second)
- Use the `state.context` to display the elapsed time.
- There's a new button for adding a minute that says **+ 1:00**. Make sure that button sends an `'ADD_MINUTE'` event when it is clicked. Don't show the button unless the machine is in the `running` state.
- When in the `running` state, the `'ADD_MINUTE'` event should trigger a transition action (in `actions`) that increments the `context.duration` by `60` seconds. Leave out the `target`; we should still be in the `running` state.
- Whenever the machine enters the `idle` state, we should reset the `duration` and `elapsed` values to their original values.

The end result should be that clicking **+ 1:00** should add 60 seconds to the remaining time in the UI, and clicking **Reset** should reset the remaining time to 60 seconds.
