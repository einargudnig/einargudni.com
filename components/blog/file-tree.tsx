import { cn } from "@/lib/utils";
import React from "react";
import { File, Folder, ChevronDown, ChevronRight } from "lucide-react";

interface FileTreeItem {
  name: string;
  children?: FileTreeItem[];
  isOpen?: boolean;
}

interface FileTreeProps {
  data: FileTreeItem[];
  className?: string;
  initialExpandAll?: boolean;
}

export function FileTree({ data, className, initialExpandAll = false }: FileTreeProps) {
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>(
    data.reduce(
      (acc, item) => {
        if (item.children) {
          acc[item.name] = initialExpandAll || !!item.isOpen;
        }
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  );

  const toggleItem = (name: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const renderItem = (item: FileTreeItem, level: number, path: string = "") => {
    const currentPath = path ? `${path}/${item.name}` : item.name;
    const isFolder = !!item.children;
    const isExpanded = isFolder && expandedItems[currentPath];

    return (
      <div key={currentPath} style={{ paddingLeft: `${level * 16}px` }}>
        <div
          className={cn(
            "flex items-center py-1",
            isFolder && "cursor-pointer hover:bg-muted/50 rounded",
          )}
          onClick={() => isFolder && toggleItem(currentPath)}
        >
          {isFolder ? (
            <>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 mr-1 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 mr-1 text-muted-foreground" />
              )}
              <Folder className="h-4 w-4 mr-2 text-brand" />
            </>
          ) : (
            <>
              <span className="w-4 mr-1" />
              <File className="h-4 w-4 mr-2 text-muted-foreground" />
            </>
          )}
          <span className="text-sm">{item.name}</span>
        </div>

        {isFolder && isExpanded && item.children && (
          <div>{item.children.map((child) => renderItem(child, level + 1, currentPath))}</div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("my-4 p-3 bg-muted/30 rounded-md border border-border", className)}>
      {data.map((item) => renderItem(item, 0))}
    </div>
  );
}
