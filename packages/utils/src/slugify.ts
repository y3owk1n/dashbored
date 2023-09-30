export const slugify = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
