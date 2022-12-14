import { Copyable, Flex, Grid, Text, Tooltip } from "@fuel-ui/react";
import { useMachine } from "@xstate/react";
import { Wallet } from "fuels";
import React, { useEffect } from "react";
import { getBalanceMachine } from "../../states/getBalanceMachine";
import { flexStyling, gridStyling } from "../../styles/customStyles";

const Wrapper = ({ children }: { children: React.ReactElement }) => {
  const [currentMachine, sendToMachine] = useMachine(getBalanceMachine);

  const PVT_KEY =
    "0x8d578c13d0f243d4718a98a06b9c9e1899aef0b483c1d1aa0e54d2a8a976792f";

  const wallet = new Wallet(
    PVT_KEY,
    "https://node-beta-1.fuel.network/graphql"
  );

  const address = wallet.address;

  useEffect(() => {
    const getBalance = async () => {
      localStorage.setItem("wallet_pvtKey", PVT_KEY);
      sendToMachine("GET_BALANCE");
    };
    getBalance();
  }, [sendToMachine]);

  return (
    <>
      <Grid css={gridStyling} gap={5}>
        {address && (
          <Flex css={flexStyling}>
            <Text css={{ fontWeight: "$extrabold" }}>Your Address:</Text>
            <Copyable value={address?.toString()}>
              <Tooltip content={address?.toString()}>
                <Text css={{ marginLeft: "0.5rem" }}>
                  {address?.toString().slice(0, 6) +
                    "..." +
                    address?.toString().slice(-3)}
                </Text>
              </Tooltip>
            </Copyable>
          </Flex>
        )}
        <Flex css={flexStyling}>
          <Text css={{ fontWeight: "$extrabold" }}>Your Balance: </Text>
          <Text css={{ marginLeft: "0.5rem" }}>
            {currentMachine.matches("loading") && "Loading..."}
            {currentMachine.matches("resolved") &&
              currentMachine.context.balance + " Eth"}
          </Text>
        </Flex>
      </Grid>
      {children}
    </>
  );
};

export default Wrapper;
