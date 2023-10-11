"use client";

import { NextUIProvider } from "@nextui-org/react";

import NavbarContextProvider from "./NavbarContext";

const ContextProvider = ( {children}: { children: React.ReactNode } ) => {

    return (
        <NextUIProvider>
            <NavbarContextProvider>
                {children}
            </NavbarContextProvider>
        </NextUIProvider>
    );
}
export default ContextProvider;