import React from "react";
import { CircleCheckBig } from "lucide-react";

export default function StepFourConfirm() {
  return (
    <div className="p-6 flex flex-col -mb-10">
      <p className="text-2xl font-medium">Create Project</p>
      <p className="text-sm text-muted-foreground mb-6">
        Review your selections and click 'Create Project' to finalize.
      </p>
      <div className="flex items-center gap-2 text-green-700">
        <CircleCheckBig className="h-4 w-4 text-green-700" />
        <p>All steps completed successfully</p>
      </div>
    </div>
  );
}
