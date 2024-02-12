import { Card, CardHeader } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";

import { type FC } from "react";

const SkeletonBlogPreview: FC = () => {
  return (
    <Card className="overflow-hidden min-w-72 lg:min-w-96 max-w-md flex flex-col snap-center">
      <Skeleton className="h-full aspect-video rounded-none" />
      <CardHeader className="flex flex-col h-full space-y-6">
        <div className="flex-1 space-y-4">
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="hidden md:block h-5 w-8/12" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 sm:h-4 w-11/12" />
            <Skeleton className="h-3 sm:h-4 w-3/4" />
            <Skeleton className="h-3 sm:h-4 w-5/6" />
          </div>
        </div>
        <Skeleton className="p-2 w-full h-full" />
      </CardHeader>
    </Card>
  );
};

export default SkeletonBlogPreview;
