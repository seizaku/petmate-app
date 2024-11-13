"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { appConfig } from "~/config/app-config";
import { useFindFirstUser } from "~/lib/hooks";
import { useSession } from "next-auth/react";

const AppBottomNav = () => {
  const path = usePathname();
  const { data: session } = useSession();
  const { data: user } = useFindFirstUser({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <nav className="fixed bottom-0 left-0 w-full border-t bg-background p-4">
      <ul className="flex place-items-center justify-around">
        {user?.role == "USER" &&
          appConfig.navigation.user.map((item) => {
            const isActive = path == item.href;
            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={buttonVariants({
                    variant: isActive ? "secondary" : "ghost",
                    className: "hover:bg-secondary",
                    size: isActive ? undefined : "icon",
                  })}
                >
                  {item.icon}
                  {isActive && item.title}
                </Link>
              </li>
            );
          })}
        {user?.role == "BUSINESS" &&
          appConfig.navigation.provider.map((item) => {
            const isActive = path == item.href;
            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={buttonVariants({
                    variant: isActive ? "secondary" : "ghost",
                    className: "hover:bg-secondary",
                    size: isActive ? undefined : "icon",
                  })}
                >
                  {item.icon}
                  {isActive && item.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};

export { AppBottomNav };
