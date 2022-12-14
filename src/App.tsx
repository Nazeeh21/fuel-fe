import {
  Box,
  Button,
  Card,
  Copyable,
  Grid,
  Heading,
  Input,
  Stack,
  Text,
  toast,
} from "@fuel-ui/react";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { sendTransactionMachine } from "./states/sendTransaction";
import { stackStyling } from "./styles/customStyles";

function App() {
  const [transactionState, sendTransaction] = useMachine(
    sendTransactionMachine
  );

  useEffect(() => {
    if (transactionState.matches("rejected")) {
      toast.error("error while sending the transaction", {
        position: "top-center",
      });
    } else if (transactionState.matches("resolved")) {
      toast.success("transaction successful!", {
        position: "top-center",
      });
    }
  }, [transactionState]);

  return (
    <Stack css={stackStyling}>
      <Card>
        <Card.Header>
          <Heading css={{ fontSize: "1.25rem", lineHeight: "1.25rem" }} as="h2">
            Send Eth
          </Heading>
        </Card.Header>
        <Grid
          gap={8}
          direction="row"
          column={1}
          css={{
            padding: "0.5rem",
            backgroundColor: "rgb(32 35 40 / 1)",
            borderRadius: "0.5rem",
          }}
        >
          <Text>Enter the address you want to send ETH to:</Text>
          <Copyable value={transactionState.context.address}>
            <Input isFullWidth>
              <Input.Field
                name="address"
                placeholder="Enter address"
                type="text"
                onChange={(e) =>
                  sendTransaction({
                    type: "UPDATING_ADDRESS",
                    value: e.target.value,
                  })
                }
                value={transactionState.context.address}
              />
            </Input>
          </Copyable>
          <Text>Enter number of Eth:</Text>
          <Input>
            <Input.Number
              inputMode="decimal"
              name="amount"
              placeholder="0.0"
              onChange={(e) =>
                sendTransaction({
                  type: "UPDATING_AMOUNT",
                  value: e.target.value,
                })
              }
              value={transactionState.context.amount}
            />
          </Input>
        </Grid>
        <Box
          css={{
            alignItems: "center",
            display: "flex",
            gap: "$4",
            marginTop: "1rem",
          }}
        >
          <Button
            color="accent"
            onPress={() => sendTransaction("SEND_TRANSACTION")}
            size="lg"
            isLoading={transactionState.matches("loading")}
            aria-label="Swap button"
          >
            {transactionState.matches("loading") ? "Loading..." : "Send"}
          </Button>
        </Box>
      </Card>
    </Stack>
  );
}

export default App;
