import { useState } from "react";
import { currencies, wallets } from "../definitions/data";
import { TabType, Currency, Wallet } from "../definitions/type";

export const useConversionLogic = () => {
  const [activeTab, setActiveTab] = useState<TabType>("crypto-to-cash");

  // Amounts
  const [payAmount, setPayAmount] = useState("1.00");
  const [receiveAmount, setReceiveAmount] = useState("1.00");

  // Selected Items
  const [selectedPayCurrency, setSelectedPayCurrency] = useState<Currency>(currencies[0]);
  const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState<Currency>(currencies[1]);
  const [selectedPayFrom, setSelectedPayFrom] = useState<Wallet | null>(null);
  const [selectedPayTo, setSelectedPayTo] = useState<Wallet | null>(null);

  // Validation States
  const [errors, setErrors] = useState<{
    amount?: string;
    payFrom?: string;
    payTo?: string;
  }>({});

  // Modal States
  const [activeDropdown, setActiveDropdown] = useState<
    "payCurrency" | "receiveCurrency" | "payFrom" | "payTo" | null
  >(null);

  // Handlers
  const handlePayCurrencySelect = (id: string) => {
    const currency = currencies.find((c) => c.id === id);
    if (currency) setSelectedPayCurrency(currency);
    setActiveDropdown(null);
  };

  const handleReceiveCurrencySelect = (id: string) => {
    const currency = currencies.find((c) => c.id === id);
    if (currency) setSelectedReceiveCurrency(currency);
    setActiveDropdown(null);
  };

  const handlePayFromSelect = (id: string) => {
    const wallet = wallets.find((w) => w.id === id);
    if (wallet) {
      setSelectedPayFrom(wallet);
      setErrors((prev) => ({ ...prev, payFrom: undefined }));
    }
    setActiveDropdown(null);
  };

  const handlePayToSelect = (id: string) => {
    const wallet = wallets.find((w) => w.id === id);
    if (wallet) {
      setSelectedPayTo(wallet);
      setErrors((prev) => ({ ...prev, payTo: undefined }));
    }
    setActiveDropdown(null);
  };

  const handleAmountChange = (value: string) => {
    setPayAmount(value);
    if (value && parseFloat(value) > 0) {
      setErrors((prev) => ({ ...prev, amount: undefined }));
    }
  };

  const handleConvert = () => {
    const newErrors: { amount?: string; payFrom?: string; payTo?: string } = {};
    let isValid = true;

    if (!payAmount || isNaN(parseFloat(payAmount)) || parseFloat(payAmount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
      isValid = false;
    }

    if (!selectedPayFrom) {
      newErrors.payFrom = "Please select a wallet";
      isValid = false;
    }

    if (!selectedPayTo) {
      newErrors.payTo = "Please select a recipient";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      alert("Converted successfully!");
    }
  };

  return {
    activeTab,
    setActiveTab,
    payAmount,
    setPayAmount,
    receiveAmount,
    setReceiveAmount,
    selectedPayCurrency,
    selectedReceiveCurrency,
    selectedPayFrom,
    selectedPayTo,
    errors,
    activeDropdown,
    setActiveDropdown,
    handlePayCurrencySelect,
    handleReceiveCurrencySelect,
    handlePayFromSelect,
    handlePayToSelect,
    handleAmountChange,
    handleConvert,
  };
};
