import * as React from "react";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CircleCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
}

export function CircleCheckbox({
  checked,
  className,
  ...props
}: CircleCheckboxProps) {
  return (
    <div className={cn("cursor-pointer relative", className)} {...props}>
      <Circle className="h-5 w-5 text-muted-foreground" />
      {checked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
        </div>
      )}
    </div>
  );
}
