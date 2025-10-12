import { cn } from "../utils/cn";

export function AppBody({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <main className={cn("size-full", className)}>{children}</main>;
}
