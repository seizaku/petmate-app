"use client";
import React from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useFindFirstUser } from "~/lib/hooks";
import { AppBottomNav, AppContainer, AppNavbar } from "~/components/app";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { TotalRevenue } from "~/features/home/components/business/total-revenue";
import { LineChart } from "~/features/history/components/chart";

export default function MyAppointmentsPage() {
  const { data: session } = useSession();
  const { data: user } = useFindFirstUser({
    where: {
      id: session?.user.id,
      AND: {
        business: {
          appointments: {
            every: {
              status: "COMPLETED",
            },
          },
        },
      },
    },
    include: {
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
      <AppNavbar title="My Bookings" href="/business/home" />

      {/* Display the total and monthly revenue */}
      <TotalRevenue />

      <LineChart />

      <h1 className="mb-2 font-medium">Client History</h1>
      {/* Appointments list */}
      <div className="grid gap-2">
        {user?.business?.appointments &&
        user?.business?.appointments.length > 0 ? (
          user.business.appointments
            .sort(
              (a, b) =>
                new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
            )
            .map((appointment) => (
              <Card key={appointment.id} className="overflow-hidden">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 rounded-xl border-2 border-white shadow-sm">
                      <AvatarImage
                        src={appointment.pet.image}
                        alt={`${appointment.pet.name}'s picture`}
                      />
                      <AvatarFallback>{appointment.pet.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <h2 className="font-medium">{appointment.pet.name}</h2>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="mr-3">
                          {format(
                            new Date(appointment.datetime),
                            "MMMM dd, yyyy",
                          )}
                        </span>
                        <span>
                          {format(new Date(appointment.datetime), "hh:mm a")}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="shadow-none">
                      {appointment?.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href={`./appointments/${appointment.id}`}
                      className={buttonVariants({ variant: "outline" })}
                    >
                      View Details
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
        ) : (
          <p>No history yet.</p>
        )}
      </div>

      <AppBottomNav />
    </AppContainer>
  );
}
