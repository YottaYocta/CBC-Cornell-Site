import type { ReactNode } from "react";

interface ThreeColRowProps {
  col1: ReactNode;
  col2: ReactNode;
  col3: ReactNode;
  disabled?: boolean;
}

export default function ThreeColRow({
  col1,
  col2,
  col3,
  disabled = false,
}: ThreeColRowProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 ${
        disabled ? "text-neutral-300" : ""
      } border-b border-b-neutral-300 border-dashed pb-2`}
    >
      <div className="flex gap-4 sm:gap-8 items-start">
        <p className="w-24 flex-shrink-0">{col1}</p>
        <p className="w-min text-nowrap flex-shrink-0">{col2}</p>
      </div>

      <div
        className={`sm:items-end sm:flex-1 sm:min-w-0 ${
          disabled ? "line-through" : ""
        }`}
      >
        <p className="sm:text-right pl-28 sm:pl-0">{col3}</p>
      </div>
    </div>
  );
}
