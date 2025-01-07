"use client";

import React, { useState } from "react";
import Graph from "@/components/homePage/graph";
import HomeNav from "@/components/homePage/homeNav";
import SourceList from "@/components/homePage/sourceList";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function HomePage() {
  const [currentView, setCurrentView] = useState("graph");
  const selectedPath = useSelector(
    (state: RootState) => state.navigation.selectedPath
  );
  const selectedFilters = useSelector(
    (state: RootState) => state.filter.selectedFilters
  );

  return (
    <div className="flex flex-col w-full h-full">
      <HomeNav onViewChange={setCurrentView} />
      <div className="flex-1">
        {currentView === "graph" ? (
          <Graph
            selectedPath={selectedPath}
            // selectedFilters={selectedFilters}
          />
        ) : (
          <SourceList
            selectedPath={selectedPath}
            selectedFilters={selectedFilters}
          />
        )}
      </div>
    </div>
  );
}
