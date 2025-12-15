import React, { useRef, useEffect, useState } from "react";
import { TabType } from "../definitions/type";

interface TabSelectorProps {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string }[] = [
  { id: "crypto-to-cash", label: "Crypto to cash" },
  { id: "cash-to-crypto", label: "Cash to crypto" },
  { id: "loan", label: "Crypto to fiat loan" },
];

export const TabSelector: React.FC<TabSelectorProps> = ({
  activeTab,
  onChange,
}) => {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const activeTabElement = tabRefs.current[activeIndex];
    const containerElement = containerRef.current;

    if (activeTabElement && containerElement) {
      const containerRect = containerElement.getBoundingClientRect();
      const tabRect = activeTabElement.getBoundingClientRect();

      setIndicatorStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div className="flex justify-center mb-8">
      <div
        ref={containerRef}
        className="bg-gray-100 p-1 rounded-full flex overflow-hidden relative"
      >
        {/* Animated background indicator */}
        <div
          className="absolute bg-primary rounded-full transition-all duration-300 ease-out shadow-sm"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            top: "4px",
            bottom: "4px",
          }}
        />

        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-out relative z-10 ${
              activeTab === tab.id
                ? "text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
