"use client";

import { motion } from "motion/react";

import { Link } from "@/i18n/routing";

export const MotionDiv = motion.div;
export const MotionA = motion.a;
export const MotionUl = motion.ul;
export const MotionFooter = motion.footer;
export const MotionSection = motion.section;
export const MotionSpan = motion.span;

export const MotionLink = motion.create(Link);

export { AnimatePresence } from "motion/react";
