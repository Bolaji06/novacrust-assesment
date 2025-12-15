"use client";

import React, { useState, useRef, useEffect } from "react";
import { currencies, wallets } from "../definitions/data";
import { TabType, Currency, Wallet } from "../definitions/type";
import { AmountInput } from "./AmountInput";
import { ListItem, SearchableList } from "./SearchableList";
import { SelectInput } from "./SelectInput";
import { TabSelector } from "./TabSelector";
import Image from "next/image";

function App() {
  const [activeTab, setActiveTab] = useState<TabType>("crypto-to-cash");

  // Amounts
  const [payAmount, setPayAmount] = useState("1.00");
  const [receiveAmount, setReceiveAmount] = useState("1.00");

  // Selected Items
  const [selectedPayCurrency, setSelectedPayCurrency] = useState<Currency>(
    currencies[0]
  ); // ETH
  const [selectedReceiveCurrency, setSelectedReceiveCurrency] =
    useState<Currency>(currencies[1]); // NGN
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

  // Refs for clicking outside to close
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

    if (
      !payAmount ||
      isNaN(parseFloat(payAmount)) ||
      parseFloat(payAmount) <= 0
    ) {
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
      alert("Validation passed! Proceeding to conversion...");
    }
  };

  // Convert data to ListItem format for dropdowns
  const currencyListItems: ListItem[] = currencies.map((c) => ({
    id: c.id,
    title: c.code,
    subtitle: c.network,
    icon: (
      <Image
        src={c.iconPath}
        alt={c.code}
        className="w-6 h-6 rounded-full object-cover"
        width={100}
        height={100}
      />
    ),
  }));

  const walletListItems: ListItem[] = wallets.map((w) => ({
    id: w.id,
    title: w.name,
    icon: (
      <Image
        src={w.iconPath}
        alt={w.name}
        className="w-6 h-6 rounded-full object-cover"
        width={100}
        height={100}
      />
    ),
  }));

  // Custom renders for the trigger buttons
  const renderWalletValue = (wallet: Wallet) => (
    <div className="flex items-center gap-2">
      <Image
        src={wallet.iconPath}
        alt={wallet.name}
        className="w-6 h-6 rounded-full object-cover"
        width={100}
        height={100}
      />
      <span className="text-primary">{wallet.name}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white overflow-x-hidden flex flex-col relative font-sans">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 flex flex-col items-center relative z-10">
        {/* The Widget Wrapper */}
        <div
          ref={containerRef}
          className="w-full max-w-[480px] bg-white rounded-[40px] p-6 md:p-8 shadow-2xl relative text-gray-900 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100"
        >
          <TabSelector activeTab={activeTab} onChange={setActiveTab} />

          <div className="flex flex-col gap-4 mb-6">
            {/* Pay Input */}
            <div className="relative z-40">
              <AmountInput
                label="You pay"
                value={payAmount}
                onChange={handleAmountChange}
                currency={selectedPayCurrency}
                onCurrencyClick={() =>
                  setActiveDropdown(
                    activeDropdown === "payCurrency" ? null : "payCurrency"
                  )
                }
                error={errors.amount}
              />
              {activeDropdown === "payCurrency" && (
                <SearchableList
                  items={currencyListItems}
                  onSelect={handlePayCurrencySelect}
                  hasSearch={true}
                />
              )}
            </div>

            {/* Receive Input */}
            <div className="relative z-30">
              <AmountInput
                label="You receive"
                value={receiveAmount}
                onChange={setReceiveAmount}
                currency={selectedReceiveCurrency}
                onCurrencyClick={() =>
                  setActiveDropdown(
                    activeDropdown === "receiveCurrency"
                      ? null
                      : "receiveCurrency"
                  )
                }
              />
              {activeDropdown === "receiveCurrency" && (
                <SearchableList
                  items={currencyListItems}
                  onSelect={handleReceiveCurrencySelect}
                  hasSearch={true}
                />
              )}
            </div>
          </div>

          {/* Pay From Select */}
          <div className="relative z-20">
            <SelectInput
              label="Pay from"
              isOpen={activeDropdown === "payFrom"}
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "payFrom" ? null : "payFrom"
                )
              }
              value={
                selectedPayFrom ? renderWalletValue(selectedPayFrom) : undefined
              }
              error={errors.payFrom}
            />
            {activeDropdown === "payFrom" && (
              <SearchableList
                items={walletListItems}
                onSelect={handlePayFromSelect}
                hasSearch={false}
              />
            )}
          </div>

          {/* Pay To Select */}
          <div className="relative z-10">
            <SelectInput
              label="Pay to"
              isOpen={activeDropdown === "payTo"}
              onClick={() =>
                setActiveDropdown(activeDropdown === "payTo" ? null : "payTo")
              }
              value={
                selectedPayTo ? renderWalletValue(selectedPayTo) : undefined
              }
              error={errors.payTo}
            />
            {activeDropdown === "payTo" && (
              <SearchableList
                items={walletListItems} // Using generic wallet list for visual completeness
                onSelect={handlePayToSelect}
                hasSearch={false}
              />
            )}
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 rounded-full mt-4 transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20"
          >
            Convert now
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
