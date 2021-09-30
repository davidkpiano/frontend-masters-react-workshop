export enum EventType {
  TOGGLE = "TOGGLE",
  RESET = "RESET",
}

export enum StateType {
  running = "running",
  idle = "idle",
  paused = "paused",
}

export const timerMachineConfig = {
  initial: StateType.idle,
  states: {
    [StateType.idle]: {
      on: {
        [EventType.TOGGLE]: StateType.running,
      }
    },
    [StateType.paused]: {
      on: {
        [EventType.TOGGLE]: StateType.running,
        [EventType.RESET]: StateType.idle,
      }
    },
    [StateType.running]: {
      on: {
        [EventType.TOGGLE]: StateType.paused,
      }
    },
  },
};

export const timerMachine = (
  state: StateType,
  event: Record<string, EventType>
): StateType => {
  const nextState = timerMachineConfig.states[state].on[event.type] || state;
  return nextState;
};
