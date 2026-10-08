import { cn } from "@/lib/utils";
import { AlertCircleIcon, AlertTriangleIcon, InfoIcon, LightbulbIcon } from "lucide-react";

type CalloutType = "info" | "warning" | "error" | "tip";

interface CalloutProps {
  children: React.ReactNode;
  type?: CalloutType;
  title?: string;
  className?: string;
}

export function Callout({ children, type = "info", title, className }: CalloutProps) {
  const icons: Record<CalloutType, React.ReactNode> = {
    info: <InfoIcon className="h-5 w-5" />,
    warning: <AlertTriangleIcon className="h-5 w-5" />,
    error: <AlertCircleIcon className="h-5 w-5" />,
    tip: <LightbulbIcon className="h-5 w-5" />,
  };

  const styles: Record<CalloutType, string> = {
    info: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300",
    warning:
      "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-300",
    error:
      "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300",
    tip: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300",
  };

  return (
    <div className={cn("my-6 rounded-lg border p-4", styles[type], className)}>
      <div className="flex items-center gap-3">
        {icons[type]}
        {title && <p className="font-medium">{title}</p>}
      </div>
      <div className="mt-2 prose-sm">{children}</div>
    </div>
  );
}
