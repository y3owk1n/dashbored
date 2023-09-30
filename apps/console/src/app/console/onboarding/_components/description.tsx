const onboardingConfig = [
  {
    title: "What is a monitor?",
    text: "A monitor is a website or api endpoint that you are going to ping on a regular basis.",
  },
  {
    title: "How to create monitors?",
    text: "You can create a monitor like you are about to via our dashboard or with our API. E.g. you can create a monitor for every instance you deploy programmatically.",
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
