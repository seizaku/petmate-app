"use client";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { buttonVariants } from "~/components/ui/button";
import { FaBell, FaUser } from "react-icons/fa6";
import { useFindFirstUser } from "~/lib/hooks";

const HomeNavbar = () => {
  const { data: user } = useFindFirstUser({
    include: {
      business: true,
    },
  });

  return (
    <div className="mb mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback></AvatarFallback>
          <AvatarImage
            src={
              (user?.role == "USER" ? user?.image : user?.business?.logo) ?? ""
            }
          />
        </Avatar>
        <div>
          <h1 className="font-medium">
            {user?.role == "USER"
              ? `Hello, ${user?.name?.split(" ")[0]}`
              : user?.business?.businessName}
          </h1>
          <p className="text-xs text-muted-foreground">How can we help you?</p>
        </div>
      </div>
      <ul className="flex gap-2">
        <li>
          <Link
            href={`./profile`}
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <FaUser className="text-primary" />
          </Link>
        </li>
        <li>
          <Link
            href={"./notifications"}
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <FaBell className="text-primary" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export { HomeNavbar };
