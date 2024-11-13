"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "~/components/ui/card";
import { FaCalendar, FaClock, FaPlus } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { format } from "date-fns";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useFindFirstUser } from "~/lib/hooks";
import { AppBottomNav, AppContainer, AppNavbar } from "~/components/app";

export default function MyAppointmentsPage() {
  const { data: session } = useSession();
  const { data: user } = useFindFirstUser({
    where: {
      id: session?.user.id,
    },
    include: {
      appointments: {
        include: {
          pet: true,
        },
      },
      business: {
        include: {
          appointments: {
            include: {
              pet: true,
            },
          },
        },
      },
    },
  });

  return (
    <AppContainer>
      <AppNavbar title="My Booking" href="/user/home" />

      <div className="grid gap-2">
        {user?.appointments.map((appointment) => (
          <Link href={`/appointments/${appointment.id}`} key={appointment.id}>
            <Card className="shadow-none">
              <CardContent className="py-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-xl">
                    <AvatarFallback className="rounded-xl"></AvatarFallback>
                    <AvatarImage
                      className="object-cover"
                      src={appointment.pet.image}
                    />
                  </Avatar>
                  <div className="space-y-1.5">
                    <CardTitle>{appointment.pet.name}</CardTitle>
                    <div className="grid">
                      <CardDescription className="flex items-center gap-2 text-xs">
                        <FaCalendar className="h-3 w-3" />
                        <span>
                          {format(appointment.datetime, "MMMM d, yyyy")}
                        </span>
                      </CardDescription>

                      <CardDescription className="flex items-center gap-2">
                        <FaClock className="h-3 w-3" />
                        <span>{format(appointment.datetime, "hh:mm a")}</span>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <AppBottomNav />
    </AppContainer>
  );
}
