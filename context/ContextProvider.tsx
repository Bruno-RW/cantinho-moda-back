"use client";

import { NextUIProvider } from "@nextui-org/react";

import NavbarContextProvider from "./NavbarContext";
import ThemeContextProvider from "./ThemeContext";

const ContextProvider = ( {children}: { children: React.ReactNode } ) => {

    return (
        <NextUIProvider>
            <ThemeContextProvider>
                <NavbarContextProvider>
                    {children}
                </NavbarContextProvider>
            </ThemeContextProvider>
        </NextUIProvider>
    );
}
export default ContextProvider;