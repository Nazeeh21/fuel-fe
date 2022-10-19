import { Wallet } from "fuels";

export const fetchBalance = async () => {
  const PVT_KEY = localStorage.getItem("wallet_pvtKey");
  const wallet = new Wallet(
    PVT_KEY as string,
    "https://node-beta-1.fuel.network/graphql"
  );
  return wallet
    .getBalance()
    .then((balance) => +balance.toString() / 1000000000);
}