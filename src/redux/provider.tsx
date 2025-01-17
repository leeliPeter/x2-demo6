"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { createContext } from "react";
import { NavData } from "@/api/navData";
import { NodeData } from "@/api/nodeData";

export const NavDataContext = createContext<NavData | null>(null);
export const NodeDataContext = createContext<NodeData | null>(null);

export function Providers({
  children,
  navData,
  nodeData,
}: {
  children: React.ReactNode;
  navData: NavData;
  nodeData: NodeData;
}) {
  return (
    <Provider store={store}>
      <NavDataContext.Provider value={navData}>
        <NodeDataContext.Provider value={nodeData}>
          {children}
        </NodeDataContext.Provider>
      </NavDataContext.Provider>
    </Provider>
  );
}
