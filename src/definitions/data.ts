import { Currency, Wallet } from "./type";

export const currencies: Currency[] = [
  {
    id: "eth",
    code: "ETH",
    name: "Ethereum",
    iconType: "crypto",
    color: "#627EEA", 
    iconPath: "/icons/eth_icon.svg",
  },
  {
    id: "ngn",
    code: "NGN",
    name: "Nigerian Naira",
    iconType: "fiat",
    color: "#008751",
    iconPath: "/icons/ngn_icon.svg",
  },
  {
    id: "usdt-celo",
    code: "USDT",
    name: "Tether USD",
    network: "CELO",
    iconType: "crypto",
    color: "#26A17B",
    iconPath: "/icons/celo_icon.svg",
  },
  {
    id: "usdt-ton",
    code: "USDT",
    name: "Tether USD",
    network: "TON",
    iconType: "crypto",
    color: "#0088CC",
    iconPath: "/icons/ton_icon.svg",
  },
  {
    id: "usdt-bnb",
    code: "USDT",
    name: "Tether USD",
    network: "BNB",
    iconType: "crypto",
    color: "#F3BA2F",
    iconPath: "/icons/bnb_icon.svg",
  },
];

export const wallets: Wallet[] = [
  { id: "metamask", name: "Metamask", iconColor: "#E2761B", iconPath: "/icons/meta_icon.svg" },
  { id: "rainbow", name: "Rainbow", iconColor: "#3466E7", iconPath: "/icons/rainbow_icon.svg" },
  { id: "walletconnect", name: "WalletConnect", iconColor: "#3B99FC", iconPath: "/icons/wallet_connect_icon.svg" },
  {
    id: "other",
    name: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)",
    iconColor: "#013C33",
    iconPath: "/icons/wallet.svg",
  },
];
