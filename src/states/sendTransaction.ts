import { assign, createMachine } from "xstate";
import { sendTransaction } from "../api/sendTransaction";

interface SendTransactionContext {
  res: any;
  error: string | null;
  address: string;
  amount: number;
}

export const sendTransactionMachine = createMachine<SendTransactionContext>(
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
    on: {
      UPDATING_ADDRESS: {
        actions: assign({
          address: (_, event) => event.value,
        }),
      },
      UPDATING_AMOUNT: {
        actions: assign({
          amount: (_, event) => event.value,
        }),
      },
    },
  },
  
);
