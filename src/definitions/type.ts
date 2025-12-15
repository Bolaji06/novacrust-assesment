import { StaticImageData } from 'next/image';
import React from 'react';

export interface Currency {
  id: string;
  code: string;
  name: string;
  iconType: 'crypto' | 'fiat';
  network?: string; // e.g., CELO, TON, BNB
  color: string;
  iconPath: string | StaticImageData;
}

export interface Wallet {
  id: string;
  name: string;
  iconColor?: string;
  iconPath: string | StaticImageData;
}

export type TabType = 'crypto-to-cash' | 'cash-to-crypto' | 'loan';

export interface DropdownOption {
  id: string;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
}