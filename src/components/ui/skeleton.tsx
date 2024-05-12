import { cn } from "@utils";

import type { FC, HTMLAttributes } from "react";

const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
};
Skeleton.displayName = "Skeleton";

export { Skeleton };
