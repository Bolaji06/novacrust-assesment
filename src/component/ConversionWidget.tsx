"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { currencies, wallets } from "../definitions/data";
import { ListItem, SearchableList } from "./SearchableList";
import { AmountInput } from "./AmountInput";
import { SelectInput } from "./SelectInput";
import { TabSelector } from "./TabSelector";
import { useConversionLogic } from "../hooks/useConversionLogic";
import { Wallet } from "../definitions/type";

export const ConversionWidget = () => {
    const {
        activeTab,
        setActiveTab,
        payAmount,
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
    } = useConversionLogic();

    // Refs for clicking outside to close - Separated the business Logic and DOM Logic.
    // Hook manages state activeDropdown. Component manages DOM refs.
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
    }, [setActiveDropdown]);

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
                        items={walletListItems}
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
    );
};
