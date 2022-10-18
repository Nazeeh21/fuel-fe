import {
  Box,
  Button,
  Card,
  Copyable,
  Grid,
  Heading,
  Input,
  Stack,
  Text
} from "@fuel-ui/react";
import { Address, Wallet } from "fuels";
import "./App.css";

function App() {
  const sendTransaction = async () => {
    const PVT_KEY = localStorage.getItem("wallet_pvtKey");
    const wallet = new Wallet(
      PVT_KEY as string,
      "https://node-beta-1.fuel.network/graphql"
    );
    const address = new Address(
      "fuel1dxm9d4wmlgm5jg62f9f3ngq9e5lvej26mh8zscp6s020f4k9j4nsr5yj6e"
    );

    try {
      const res = (
        await wallet.transfer(address, 0.001, '0x00001', {
          gasLimit: 1000000,
        })
      ).wait();
      console.log("res:", res);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <>
      <Stack
        css={{
          maxW: "400px",
          margin: "auto",
          marginTop: "100px",
          borderRadius: "0.75rem",
          backgroundColor: "rgb(23 25 28 / 1)",
          padding: "0.75rem",
        }}
      >
        <Card>
          <Card.Header>
            <Heading
              css={{ fontSize: "1.25rem", lineHeight: "1.25rem" }}
              as="h2"
            >
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
            <Copyable value="">
              <Input isFullWidth>
                <Input.Field
                  name="address"
                  placeholder="Enter address"
                  type="text"
                />
              </Input>
            </Copyable>
            <Text>Enter number of Eth:</Text>
            <Input>
              <Input.Number
                inputMode="decimal"
                name="amount"
                placeholder="0.0"
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
              onPress={sendTransaction}
              size="lg"
              aria-label="Swap button"
            >
              Send
            </Button>
          </Box>
        </Card>
      </Stack>
    </>
  );
}

export default App;
