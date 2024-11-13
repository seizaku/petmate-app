"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { FaUsers, FaChevronRight } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useFindFirstUser, useFindManyAppointment } from "~/lib/hooks";
import { format } from "date-fns";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const AppointmentsToday = () => {
  const { data: appointments } = useFindManyAppointment({
    include: {
      business: true,
      pet: true,
    },
  });

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Appointments Today
        </CardTitle>
        <FaUsers className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="mt-2 space-y-4">
          {appointments?.map((client) => (
            <div key={client.id} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarFallback></AvatarFallback>
                <AvatarImage src={client.pet.image} />
              </Avatar>

              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {client.pet.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(client.datetime, "MMMM dd, yyyy • hh:mm a")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { AppointmentsToday };
