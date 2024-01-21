import { Card, CardHeader } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";

import { type FC } from "react";

const SkeletonBlogPreview: FC = () => {
  return (
    <Card className="overflow-hidden flex flex-col">
      <Skeleton className="w-full aspect-video rounded-none h-full" />
      <CardHeader className="flex flex-col h-full space-y-6">
        <div className="flex-1 space-y-4">
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-8/12" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="space-y-2 flex items-end flex-col">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default SkeletonBlogPreview;
