"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { createContext } from "react";
import { NavData } from "@/api/navData";

export const NavDataContext = createContext<NavData | null>(null);

export function Providers({
  children,
  navData,
}: {
  children: React.ReactNode;
  navData: NavData;
}) {
  return (
    <Provider store={store}>
      <NavDataContext.Provider value={navData}>
        {children}
      </NavDataContext.Provider>
    </Provider>
  );
}
