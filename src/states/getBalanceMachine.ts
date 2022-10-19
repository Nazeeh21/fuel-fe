import { assign, createMachine } from "xstate";
import { fetchBalance } from "../api/fetchBalance";

export const getBalanceMachine = createMachine({
  id: "getBalance",
  initial: "idle",
  context: {
    balance: null,
  },
  states: {
    idle: {
      on: {
        GET_BALANCE: "loading",
      },
    },
    loading: {
      // @ts-expect-error
      invoke: {
        id: "fetchBalance",
        src: fetchBalance,
        onDone: {
          target: "resolved",
          actions: assign({
            balance: (_, event) => event.data,
          }),
        },
        onError: {
          target: "rejected",
          actions: assign({
            error: (_, event) => event.data,
          }),
        },
        on: {
          CANCEL: "idle ",
        },
      },
    },
    resolved: {
      type: "final",
    },
    rejected: {
      on: {
        FETCH: "loading",
      },
    },
  },
});
