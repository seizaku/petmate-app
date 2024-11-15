"use client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { useFindFirstUser } from "~/lib/hooks";

const UpcomingAppointment = () => {
  const router = useRouter();
  const { data: user } = useFindFirstUser({
    include: {
      business: {
        include: {
          appointments: {
            include: {
              pet: true,
            },
            where: {
              status: "SCHEDULED",
            },
            orderBy: {
              datetime: "asc",
            },
          },
        },
        where: {
          appointments: {
            some: {
              status: "SCHEDULED",
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    console.log(user?.business?.appointments);
  }, [user?.business?.appointments]);

  return (
    <Card className="bg-gradient mb-4 bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-white">
      <CardHeader>
        <CardTitle>Upcoming Appointment</CardTitle>
      </CardHeader>

      {user?.business?.appointments.length && (
        <>
          <CardContent>
            <h1 className="text-2xl font-bold">
              {format(
                user?.business?.appointments?.[0]?.datetime!,
                "MMMM dd, h:mm a",
              )}
            </h1>
            <p>
              {user?.business?.appointments?.[0]?.pet.name} {` • `}
              <span className="capitalize">
                {user?.business?.appointments?.[0]?.pet.gender.toLowerCase()}
              </span>{" "}
              • {user?.business?.appointments?.[0]?.pet.breed} •{" "}
              {user?.business?.appointments?.[0]?.pet.age}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                router.push(
                  `/business/appointments/${user?.business?.appointments?.[0]?.id}`,
                );
              }}
              variant={"outline"}
              className="text-foreground"
            >
              Details
            </Button>
          </CardFooter>
        </>
      )}

      {!user?.business?.appointments.length && (
        <CardContent>
          <p>You have no appointments yet.</p>
        </CardContent>
      )}
    </Card>
  );
};

export { UpcomingAppointment };
