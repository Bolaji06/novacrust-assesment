"use client";

import React from "react";
import { ConversionWidget } from "./ConversionWidget";

function App() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white overflow-x-hidden flex flex-col relative font-sans">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 flex flex-col items-center relative z-10">
        {/* The Widget Wrapper */}
        <ConversionWidget />
      </main>
    </div>
  );
}

export default App;
