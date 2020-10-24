# Exercise 08

You've made it to the final exercise! This will be the most challenging one, as we will be adding screens and the ability to customize the `duration` of the timer, as well as delete it..

## Goals

As you may have noticed, there's a couple new files:

### `TimerApp.js`

This is the new entrypoint to our timer app. It controls two screens: `<NewTimer>` and `<Timer>`.

- Create a machine that goes between the `'new'` and `'timer'` states
  and also keeps track of the `duration` to pass to the `<Timer />`
  component in context.
- When the `<NewTimer>` submits a `duration`, that "callback" should
  be handled by the machine as an event and go to the 'timer' state.
- When the `<Timer>` indicates that it is deleted, that "callback"
  should also be handled by the machine as another event
  and go back to the 'new' state.
- Only show the `<Timer>` component when the state is in the `'timer'` state.

### `NewTimer.js`

This is the simple form that lets you create a new timer.

- Create a `newTimerMachine` that keeps track of the numeric `duration` entered in the `<input>` in `context`, updates that `context.duration` whenever that input is changed, and executes a `"submit"` action when the form is submitted.
- That `"submit"` action should only occur if the duration is `> 0`. Don't put this logic inside of `onSubmit`!
- Hint: the `"submit"` action should be parameterized, so we can define it in the component within the 2nd argument to `useMachine(..., options)`.

### `Timer.js`

Not much needs to be done here, but there are a couple changes.

- The `duration` now comes from props (aliased to `durationProp`). Use that to create the machine with the custom duration.
- There is a new **Delete** button. That shouldn't necessarily send an event to the machine; instead, it should call the `onDelete` callback. This is normal React stuff...
- ... but for extra credit, how would you do this within the machine? Why might that be a better pattern? Try it out!

### `timerMachine.js`

Thankfully, not much needs to be done here either.

- Notice that there is a `createTimerMachine` function that takes in the `duration`. Make sure that dynamically creates a timer machine with the specified `duration` (currently hardcoded).
- The new behavior we want is that the timer should immediately start in the `running` state. Make sure that happens.

---

Overall, a sample user flow should look like this:

1. User sees the `<NewTimer>` screen
2. User enters a number (greater than 0)
3. User presses <kbd>enter</kbd> or clicks the **Play** button
4. Now, the `<Timer>` screen shows with the user's specified duration
5. That timer should be immediately started.
6. At any time, when the user presses the **Delete** button, we should go back to the `<NewTimer>` screen.
