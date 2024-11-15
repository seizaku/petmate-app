"use client";
import React, { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import {
  useCreateNotification,
  useFindFirstUser,
  useUpdateAppointment,
} from "~/lib/hooks";
import { AppBottomNav, AppContainer, AppNavbar } from "~/components/app";
import { Badge } from "~/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type Status } from "@prisma/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

export default function MyAppointmentsPage() {
  const { data: session } = useSession();
  const { data: user } = useFindFirstUser({
    where: { id: session?.user.id },
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

  const { mutateAsync: updateAppointment } = useUpdateAppointment();
  const { mutateAsync: createNotification } = useCreateNotification();
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null,
  );
  const [newStatus, setNewStatus] = useState<Status | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleStatusChange = async () => {
    if (selectedAppointment && newStatus) {
      await updateAppointment({
        data: { status: newStatus },
        where: { id: selectedAppointment },
      });

      await createNotification({
        data: {
          userMessage: `Your appointment is ${newStatus.toLowerCase()}`,
          type: "REMINDER",
          user: {
            connect: {
              id: selectedUser!,
            },
          },
        },
      });
    }
  };

  return (
    <AppContainer>
      <AppNavbar title="My Bookings" href="/business/home" />

      <div className="grid gap-2">
        {user?.business?.appointments
          .sort((a, b) => b.datetime.getTime() - a.datetime.getTime())
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
                        {format(appointment.datetime, "MMMM dd, yyyy")}
                      </span>
                      <span>{format(appointment.datetime, "hh:mm a")}</span>
                    </div>
                  </div>
                  <Badge variant={"outline"} className={`shadow-none`}>
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
                  <Select
                    disabled={["COMPLETED", "DECLINED", "CANCELLED"].includes(
                      appointment.status,
                    )}
                    onValueChange={(value: Status) => {
                      setSelectedAppointment(appointment.id);
                      setSelectedUser(appointment.userId);
                      setNewStatus(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      {["PENDING", "APPROVED", "DECLINED"].includes(
                        appointment.status,
                      ) && (
                        <>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="APPROVED">Approve</SelectItem>
                          <SelectItem value="DECLINED">Decline</SelectItem>
                        </>
                      )}

                      {appointment.status == "SCHEDULED" && (
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <AlertDialog
        open={selectedAppointment !== null}
        onOpenChange={() => setSelectedAppointment(null)}
      >
        <AlertDialogTrigger />
        <AlertDialogContent className="max-w-sm rounded-xl">
          <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to change the status of this appointment to{" "}
            <span className="font-bold capitalize">
              {newStatus?.toLowerCase()}
            </span>
            ?
          </AlertDialogDescription>
          <div className="flex items-center justify-end space-x-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="mt-2" onClick={handleStatusChange}>
              Confirm
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AppBottomNav />
    </AppContainer>
  );
}
