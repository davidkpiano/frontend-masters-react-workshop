# Exercise 08 - Spawning Actors

You've made it to the final exercise! 🎉 We'll learn how to _distribute_ state in localized, private little entities called [actors](https://xstate.js.org/docs/guides/actors.html).

## Goals

- Learn how to `spawn()` actors dynamically and see how this can be helpful in isolating logic and state
- In `timerAppMachine.js`, spawn a new timer machine via `createTimerMachine()` on the `ADD` action.
- Update the `context` via `assign()` so that it has the updated `context.timers` (with the newly spawned timer appended) and `context.currentTimer` (with the index of that timer).

---

Overall, a sample user flow should look like this:

1. User sees the `<NewTimer>` screen
2. User enters a number (greater than 0)
3. User presses the **enter** key or clicks the **Play** button
4. Now, the `<Timer>` screen shows with the user's specified duration
5. That timer should be immediately started.
6. When the user presses the **Delete** button, we should:
   - Go to the previous timer, if there are any.
   - Otherwise, go back to the `<NewTimer>` screen.
7. When the user presses the **Add** button, we should go to the `<NewTimer>` screen to add a new timer.
   - If the user presses the **Cancel** button on this screen, we should go back to the previous timer.
