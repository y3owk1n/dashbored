import type { ValidIcon } from "@dashbored/ui";

interface Social {
  title: string;
  href: string;
  icon: ValidIcon;
}

export const socialsConfig: Social[] = [
  {
    title: "GitHub",
    href: "/github",
    icon: "github",
  },
];
