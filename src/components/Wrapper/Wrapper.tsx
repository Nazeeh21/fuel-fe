import { Copyable, Flex, Grid, Text } from "@fuel-ui/react";
import { AbstractAddress, Wallet } from "fuels";
import React, { useEffect, useState } from "react";

const Wrapper = ({ children }: { children: React.ReactElement }) => {
  const [balance, setBalance] = useState<number>();
  const [address, setAddress] = useState<AbstractAddress>();
  useEffect(() => {
    const getBalance = async () => {
      const PVT_KEY =
        "0x8d578c13d0f243d4718a98a06b9c9e1899aef0b483c1d1aa0e54d2a8a976792f";

      localStorage.setItem("wallet_pvtKey", PVT_KEY);
      const wallet = new Wallet(
        PVT_KEY,
        "https://node-beta-1.fuel.network/graphql"
      );

      setAddress(wallet.address);
      const balance = await wallet.getBalance();
      setBalance(+balance.toString() / 1000000000);
    };
    getBalance();
  }, []);
  return (
    <>
      <Grid
        css={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          margin: "1rem",
        }}
        gap={5}
      >
        {address && (
          <Flex
            css={{
              backgroundColor: "Black",
              borderRadius: "$full",
              padding: "0.5rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <Text css={{ fontWeight: "$extrabold" }}>Your Address:</Text>
            <Copyable value={address?.toString()}>
              <Text css={{ marginLeft: "0.5rem" }}>
                {address?.toString().slice(0, 4) +
                  "..." +
                  address?.toString().slice(-3)}
              </Text>
            </Copyable>
          </Flex>
        )}
        <Flex
          css={{
            backgroundColor: "Black",
            borderRadius: "$full",
            padding: "0.5rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Text css={{ fontWeight: "$extrabold" }}>Your Balance: </Text>
          <Text css={{ marginLeft: "0.5rem" }}>{balance} ETH</Text>
        </Flex>
      </Grid>
      {children}
    </>
  );
};

export default Wrapper;
