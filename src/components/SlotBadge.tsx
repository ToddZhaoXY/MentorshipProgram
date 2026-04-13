import { cn } from "@/lib/utils";

interface SlotBadgeProps {
  slotsRemaining: number;
  maxSlots: number;
  size?: "sm" | "lg";
}

export function SlotBadge({
  slotsRemaining,
  maxSlots,
  size = "sm",
}: SlotBadgeProps) {
  const isFull = slotsRemaining === 0;
  const taken = maxSlots - slotsRemaining;
  const dotSize = size === "lg" ? "w-4 h-4" : "w-3 h-3";

  return (
    <div className={cn("flex items-center", size === "lg" ? "gap-5" : "gap-3")}>
      {/* Visual dots */}
      <div className={cn("flex items-center", size === "lg" ? "gap-2.5" : "gap-1.5")}>
        {Array.from({ length: maxSlots }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "rounded-full border transition-all duration-300",
              dotSize,
              i < taken
                ? "bg-gold-dark border-gold-dark opacity-40"
                : "bg-gold-mid border-gold-mid shadow-[0_0_6px_rgba(232,212,162,0.3)]"
            )}
          />
        ))}
      </div>

      {/* Number + label */}
      <span
        className={cn(
          "text-gold-light font-normal leading-none",
          size === "lg" ? "text-3xl" : "text-xl",
          isFull && "text-gold-dark opacity-50"
        )}
      >
        {isFull ? "0" : slotsRemaining}
      </span>
      <span
        className={cn(
          "uppercase tracking-[0.2em] leading-none",
          size === "lg" ? "text-[0.7rem]" : "text-[0.65rem]",
          isFull ? "text-gold-dark opacity-50" : "text-gold-dark"
        )}
      >
        {isFull ? "Fully booked" : `seat${slotsRemaining > 1 ? "s" : ""} open`}
      </span>
    </div>
  );
}
