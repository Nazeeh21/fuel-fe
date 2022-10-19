import { assign, createMachine } from "xstate";
import { sendTransaction } from "../api/sendTransaction";

export const sendTransactionMachine = createMachine(
  {
    id: "transaction",
    initial: "idle",
    context: {
      res: null,
      error: null,
      address: "",
      amount: 0,
    },
    states: {
      idle: {
        on: {
          SEND_TRANSACTION: "loading",
          UPDATING_ADDRESS: { actions: "updatingAddress" },
          UPDATING_AMOUNT: { actions: "updatingAmount" },
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
              address: "",
              amount: 0,
              error: null,
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
  },
  {
    actions: {
      updatingAddress: assign((ctx, e) => ({
        // @ts-expect-error
        address: e.value,
      })),
      updatingAmount: assign((ctx, e) => ({
        // @ts-expect-error
        amount: e.value,
      })),
    },
  }
);
