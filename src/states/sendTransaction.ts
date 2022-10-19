import { assign, createMachine } from "xstate";
import { sendTransaction } from "../api/sendTransaction";

export const sendTransactionMachine = createMachine({
  id: "transaction",
  initial: "idle",
  context: {
    res: null,
    error: null,
  },
  states: {
    idle: {
      on: {
        SEND_TRANSACTION: "loading",
      },
    },
    loading: {
      // @ts-expect-error
      invoke: {
        id: "sendTransaction",
        src: sendTransaction,
        onDone: {
          target: "resolved",
          actions: assign({
            res: (_, event) => event.data,
          }),
        },
        onError: {
          target: "rejected",
          actions: assign({
            error: (_, event) => event.data,
          }),
        },
      },
      on: {
        CANCEL: "idle",
      },
    },
    resolved: {
      type: "final",
    },
    rejected: {
      on: {
        SEND_TRANSACTION: "loading",
      },
    },
  },
});
