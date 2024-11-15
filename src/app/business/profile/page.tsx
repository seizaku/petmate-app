"use client";
import Link from "next/link";
import React from "react";
import { AppContainer, AppNavbar, AppBottomNav } from "~/components/app";
import { Button, buttonVariants } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { FaChevronRight } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { appConfig } from "~/config/app-config";
import { SignOut } from "~/features/profile/components/logout";
import { useFindFirstUser } from "~/lib/hooks";

export default function ProfilePage() {
  const { data: user } = useFindFirstUser({
    include: {
      business: true,
    },
  });

  return (
    <AppContainer>
      <AppNavbar title="Profile" href="/business/home" />

      <Avatar className="mx-auto mb-4 h-28 w-28">
        <AvatarFallback>LZ</AvatarFallback>
        <AvatarImage src={user?.business?.logo ?? ""} />
      </Avatar>

      <h1 className="text-center text-xl font-bold capitalize">
        {user?.business?.businessName}
      </h1>

      <p className="mb-4 text-center">{user?.email}</p>

      <div className="mb-8 flex justify-center">
        <Link className={buttonVariants()} href={"/business/profile/edit"}>
          Edit Profile
        </Link>
      </div>

      <h1 className="mb-4 px-6 font-medium">Services & Pricing</h1>
      <div className="mb-8 grid gap-2">
        <Card className="divide-y shadow-none">
          {appConfig.servicesAndPricing.map((item) => (
            <Link key={item.title} href={item.href}>
              <CardContent className="py-4 hover:bg-muted">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant={"secondary"} size={"icon"}>
                      {item.icon}
                    </Button>
                    <div className="space-y-1">
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                  </div>
                  <FaChevronRight />
                </div>
              </CardContent>
            </Link>
          ))}
        </Card>
      </div>

      <h1 className="mb-4 px-6 font-medium">Legal Information</h1>
      <div className="mb-8 grid gap-2">
        <Card className="divide-y shadow-none">
          {appConfig.legalInformation.map((item) => (
            <Link key={item.title} href={item.href}>
              <CardContent className="py-4 hover:bg-muted">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant={"secondary"} size={"icon"}>
                      {item.icon}
                    </Button>
                    <div className="space-y-1">
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                  </div>
                  <FaChevronRight />
                </div>
              </CardContent>
            </Link>
          ))}
        </Card>
      </div>

      <h1 className="mb-4 px-6 font-medium">Support</h1>
      <div className="mb-4 grid gap-2">
        <Card className="divide-y shadow-none">
          {appConfig.customerSupport.map((item) => (
            <Link key={item.title} href={item.href}>
              <CardContent className="py-4 hover:bg-muted">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant={"secondary"} size={"icon"}>
                      {item.icon}
                    </Button>
                    <div className="space-y-1">
                      <CardTitle>{item.title}</CardTitle>
                    </div>
                  </div>
                  <FaChevronRight />
                </div>
              </CardContent>
            </Link>
          ))}
        </Card>
      </div>

      <SignOut />

      <AppBottomNav />
    </AppContainer>
  );
}
