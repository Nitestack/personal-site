"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { classNames } from "@utils";
import NextImage from "next/image";
import { forwardRef } from "react";

import type { ImageProps } from "next/image";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

const Avatar = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={classNames(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<
  ElementRef<typeof NextImage>,
  Omit<ImageProps, "src"> & { src: string }
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    className={classNames("aspect-square h-full w-full", className)}
    src={props.src}
    asChild
  >
    <NextImage fill ref={ref} {...props} />
  </AvatarPrimitive.Image>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<
  ElementRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={classNames(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
