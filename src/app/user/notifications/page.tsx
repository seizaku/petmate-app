"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { FaBell } from "react-icons/fa6";
import { useFindFirstUser } from "~/lib/hooks";
import { AppBottomNav, AppContainer, AppNavbar } from "~/components/app";
import { format } from "date-fns";

export default function NotificationsPage() {
  const { data: user } = useFindFirstUser({
    include: {
      notifications: true,
    },
  });

  return (
    <AppContainer>
      <AppNavbar title="Notifications" href="/user/home" />

      <div className="grid gap-2">
        {user?.notifications
          .filter((value) => value.userMessage != null)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .map((notification) => (
            <Card key={notification.id} className="shadow-none">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Button variant={"secondary"} size={"icon"}>
                    <FaBell className="text-primary" />
                  </Button>
                  <div className="space-y-1">
                    <CardTitle>{notification.userMessage}</CardTitle>
                    <CardDescription className="text-xs">
                      {format(notification.createdAt, "MMMM dd, yyyy hh:mm a")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
      </div>

      <AppBottomNav />
    </AppContainer>
  );
}
