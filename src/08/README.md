# Exercise 08 - Spawning Actors

You've made it to the final exercise!

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
