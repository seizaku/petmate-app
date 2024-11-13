import { cn } from "~/lib/utils";

type AppContainer = {
  children: React.ReactNode;
  className?: string;
};

const AppContainer = ({ children, className }: AppContainer) => {
  return (
    <main
      className={cn(
        "container relative mx-auto min-h-screen w-screen p-6 pb-24 text-sm",
        className,
      )}
    >
      {children}
    </main>
  );
};

export { AppContainer };
