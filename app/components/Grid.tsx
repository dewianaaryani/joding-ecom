import React from "react";
import Tech from "./Tech";
import Superiority from "./Superiority";
import HowItWork from "./HowItWork";

export default function Grid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 w-full">
      <Tech />
      <Superiority />
      <HowItWork />
    </div>
  );
}
