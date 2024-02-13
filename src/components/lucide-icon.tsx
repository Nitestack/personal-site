import { type LucideIcon as LucideIconType, icons } from "lucide-react";
import { type ComponentProps, type FC } from "react";

const LucideIcon: FC<
  { name: keyof typeof icons } & ComponentProps<LucideIconType>
> = ({ name, ...props }) => {
  const Icon = icons[name];

  return <Icon {...props} />;
};

export default LucideIcon;
