import { Address, Wallet } from "fuels";

export const sendTransaction = async (
  _address: string = "fuel1dxm9d4wmlgm5jg62f9f3ngq9e5lvej26mh8zscp6s020f4k9j4nsr5yj6e",
  amount: string = "0.000001"
) => {
  const PVT_KEY = localStorage.getItem("wallet_pvtKey");
  const wallet = new Wallet(
    PVT_KEY as string,
    "https://node-beta-1.fuel.network/graphql"
  );

  const address = new Address(_address as `fuel${string}`);

  const res = (
    await wallet.transfer(address, +amount, undefined, {
      gasPrice: 1,
    })
  ).wait();
  
  return res;
};
