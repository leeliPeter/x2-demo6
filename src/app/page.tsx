import React from "react";
import Graph from "@/components/homePage/graph";
import HomeNav from "@/components/homePage/homeNav";
export default function HomePage() {
  return (
    <div className="flex flex-col w-full h-full">
      <HomeNav />
      <div className="flex-1">
        <Graph />
      </div>
    </div>
  );
}
