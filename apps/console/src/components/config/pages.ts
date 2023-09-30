import type { ValidIcon } from "@dashbored/ui";

interface Page {
  title: string;
  description: string;
  href: string;
  icon: ValidIcon;
  disabled?: boolean;
}

export const pagesConfig: Page[] = [
  {
    title: "Spaces",
    description: "Check all the spaces in one place.",
    href: "/spaces",
    icon: "orbit",
  },
  {
    title: "Apps",
    description: "Check all the spaces in one place.",
    href: "/apps",
    icon: "blocks",
  },
  {
    title: "Members",
    description: "Check all the spaces in one place.",
    href: "/members",
    icon: "user",
  },
];
