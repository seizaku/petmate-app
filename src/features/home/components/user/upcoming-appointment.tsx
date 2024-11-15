"use client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
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
      appointments: {
        include: {
          pet: true,
          business: true,
        },
        where: {
          status: "SCHEDULED",
        },
        orderBy: {
          datetime: "asc",
        },
      },
    },
  });

  return (
    <Card className="bg-gradient mb-4 bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-white">
      <CardHeader>
        <CardTitle>Upcoming Appointment</CardTitle>
      </CardHeader>

      {!!user?.appointments.length && (
        <>
          <CardContent>
            <h1 className="text-2xl font-bold">
              {user?.appointments?.[0]?.datetime &&
                format(user?.appointments?.[0]?.datetime, "MMMM dd, h:mm a")}
            </h1>
            <p>{user?.appointments?.[0]?.business.businessName}</p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => {
                router.push(
                  `/user/appointments/${user?.appointments?.[0]?.id}`,
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
      {!user?.appointments.length && (
        <CardContent>
          <p>You have no appointments yet.</p>
        </CardContent>
      )}
    </Card>
  );
};

export { UpcomingAppointment };
