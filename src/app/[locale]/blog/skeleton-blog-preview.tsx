import { type FC } from "react";

import { Card, CardHeader } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";

const SkeletonBlogPreview: FC = () => {
  return (
    <Card className="flex max-w-md min-w-72 snap-center flex-col overflow-hidden lg:min-w-96">
      <Skeleton className="aspect-video h-full rounded-none" />
      <CardHeader className="flex h-full flex-col space-y-6">
        <div className="flex-1 space-y-4">
          <div className="flex flex-col items-center space-y-2">
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="hidden h-5 w-8/12 md:block" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-11/12 sm:h-4" />
            <Skeleton className="h-3 w-3/4 sm:h-4" />
            <Skeleton className="h-3 w-5/6 sm:h-4" />
          </div>
        </div>
        <Skeleton className="h-full w-full p-2" />
      </CardHeader>
    </Card>
  );
};

export default SkeletonBlogPreview;
