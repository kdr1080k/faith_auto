import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "great-value";
}

export function GreatValueBadge({ className, ...props }: BadgeProps) {
  return (
    <div 
      className={cn(
        "bg-[#F59E0B] text-white text-xs px-2 py-1 rounded-md font-medium absolute top-4 right-4 z-10",
        className
      )} 
      {...props}
    >
      Great value
    </div>
  );
}

export function AvailabilityBadge({ available = true }: { available?: boolean }) {
  return (
    <div className="flex items-center text-sm text-green-600">
      <i className="fas fa-circle text-xs mr-1"></i>
      <span>{available ? "Available" : "Unavailable"}</span>
    </div>
  );
}
