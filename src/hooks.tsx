"use client";

import { Link, useRouter } from "@navigation";

import {
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
  useTransition,
} from "react";

export const TransitionLink: FC<
  Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
    fallback?: ReactNode;
    href: string;
    hrefOptions?: Parameters<ReturnType<typeof useRouter>["push"]>[1];
  }
> = ({ fallback, children, hrefOptions, ...props }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Link
      {...props}
      onClick={() =>
        startTransition(() => router.push(props.href, hrefOptions))
      }
    >
      {isPending && fallback ? fallback : children}
    </Link>
  );
};
