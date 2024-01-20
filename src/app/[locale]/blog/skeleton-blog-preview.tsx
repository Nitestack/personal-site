import { Card, CardFooter, CardHeader } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";

import { type FC } from "react";

const SkeletonBlogPreview: FC = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="w-full aspect-video rounded-none" />
      <CardHeader className="space-y-4">
        <div className="space-y-2 flex flex-col items-center">
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-8/12" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </CardHeader>
      <CardFooter className="justify-between items-end">
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-36" />
        </div>
        <div className="space-y-2 flex items-end flex-col">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-36" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SkeletonBlogPreview;
