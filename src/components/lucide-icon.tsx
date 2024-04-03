import { icons } from "lucide-react";
import { type ComponentProps, type FC } from "react";

import type { LucideIcon as LucideIconType } from "lucide-react";

const LucideIcon: FC<
  { name: keyof typeof icons } & ComponentProps<LucideIconType>
> = ({ name, ...props }) => {
  const Icon = icons[name];

  return <Icon {...props} />;
};

export default LucideIcon;
