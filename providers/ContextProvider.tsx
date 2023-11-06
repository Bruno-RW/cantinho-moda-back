"use client";

import { NextUIProvider } from "@nextui-org/react";

import NavbarContextProvider from "@/context/NavbarContext";
import ThemeContextProvider from "@/context/ThemeContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <ThemeContextProvider>
        <NavbarContextProvider>{children}</NavbarContextProvider>
      </ThemeContextProvider>
    </NextUIProvider>
  );
};
export default ContextProvider;