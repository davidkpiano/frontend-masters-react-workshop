# Exercise 06 - Hierarchical States

In this exercise, we'll be exploring [hierarchical states](https://xstate.js.org/docs/guides/hierarchical.html) to add "overtime" logic. Instead of the machine going to an `expired` state, it should still have the same behavior as if it were running, but we should also be in some `running.overtime` state, so that we know that the time is already expired.

We'll also use [forbidden transitions](https://xstate.js.org/docs/guides/transitions.html#forbidden-transitions) to tweak the behavior for these nested states.

## Goals

- Add two hierarchical (nested) states to the `running` state:
  - `running.normal`, which is the normal timer countdown behavior, and the initial state
  - `running.overtime`, which is the expired timer countdown behavior that can also be reset.
- Move the eventless transition from `running` into `running.normal`, and transition to the sibling `overtime` instead of `expired`, since this is what we want our new behavior to be.
- Since we now want to allow `RESET` to transition to `idle` in both `running.overtime` and `paused`, move that transition to the parent, so that a `RESET` event would transition to `.idle`.
- However, we don't want a `RESET` event to do anything in `running.normal`, so forbid that transition.
- We also don't want `TOGGLE` to do anything in `running.overtime`, so forbid that transition as well.
