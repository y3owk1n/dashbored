const TITLE = "DashBored";
const DESCRIPTION = "Open-Source dashboard for everyone.";

export const defaultMetadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://www.dashbored.dev"),
};

export const twitterMetadata = {
  title: TITLE,
  description: DESCRIPTION,
  card: "summary_large_image",
  images: [`/api/og`],
};

export const ogMetadata = {
  title: TITLE,
  description: DESCRIPTION,
  type: "website",
  images: [`/api/og`],
};
