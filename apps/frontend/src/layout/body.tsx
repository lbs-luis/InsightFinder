import { cn } from "../lib/cn";

export function AppBody({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <main
      className={cn(
        "flex flex-1 flex-col w-full max-w-7xl mx-auto px-4 py-6",
        className
      )}
    >
      {children}
    </main>
  );
}
