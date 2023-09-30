const onboardingConfig = [
  {
    title: "What is a workspace?",
    text: "A workspace is that will contain a dashboard that can be either shared with or without members.",
  },
] as const;

export function Description() {
  return (
    <div className="border-border flex h-full flex-col gap-6 border-l pl-4 md:pl-6">
      {onboardingConfig.map(({ title, text }, i) => {
        return (
          <dl key={i} className="grid gap-2">
            <dt>{title}</dt>
            <dd className="text-muted-foreground text-sm">{text}</dd>
          </dl>
        );
      })}
    </div>
  );
}
