import Link from "next/link";
import React, { type ReactNode } from "react";
import { Button, buttonVariants } from "~/components/ui/button";
import { FaChevronLeft } from "react-icons/fa6";

type AppNavbar = {
  href: string;
  title: string;
  rightAction?: boolean;
  rightActionIcon?: ReactNode;
  rightActionFn?: () => void;
};

const AppNavbar = ({
  href,
  title,
  rightAction,
  rightActionIcon,
  rightActionFn,
}: AppNavbar) => {
  return (
    <div className="mb-6 bg-background">
      <div className="relative flex items-center justify-center pb-4 text-center">
        <Link
          href={href}
          className={buttonVariants({
            variant: "secondary",
            className: "absolute left-0 top-0",
            size: "icon",
          })}
        >
          <FaChevronLeft className="text-primary" />
        </Link>
        <h1 className="mt-1 text-lg font-medium">{title}</h1>
        {rightAction && (
          <Button
            onClick={rightActionFn}
            variant={"outline"}
            size={"icon"}
            className="absolute right-0 top-0"
          >
            {rightActionIcon}
          </Button>
        )}
      </div>
    </div>
  );
};

export { AppNavbar };
