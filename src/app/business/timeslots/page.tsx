"use client";
import React, { useState } from "react";
import { AppContainer, AppBottomNav, AppNavbar } from "~/components/app";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import { FaClock, FaPlus } from "react-icons/fa6";
import { useDeleteTimeSlot, useFindFirstUser } from "~/lib/hooks";
import { Dialog, DialogContent, DialogTitle } from "~/components/ui/dialog";
import { AlertDialogHeader } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { type TimeSlot } from "@prisma/client";
import { toast } from "sonner";
import { TimeslotForm } from "~/features/timeslot/components/forms/timeslot";

export default function TimeSlotPage() {
  const { data: user } = useFindFirstUser({
    include: {
      business: {
        include: {
          timeslots: true,
        },
      },
    },
  });

  const { mutateAsync: deleteTimeSlot } = useDeleteTimeSlot();

  const [open, setOpen] = useState(false);

  async function handleDelete(id: TimeSlot["id"]) {
    try {
      await deleteTimeSlot({
        where: {
          id,
        },
      });
      toast.success("Delete successful");
    } catch (error) {
      console.error(error);
      toast.error("Could not delete item");
    }
  }

  return (
    <AppContainer>
      <AppNavbar
        title="Availability"
        href="/business/home"
        rightAction
        rightActionIcon={<FaPlus className="text-primary" />}
        rightActionFn={() => setOpen(true)}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <AlertDialogHeader>
            <DialogTitle>Time Slot</DialogTitle>
          </AlertDialogHeader>
          <TimeslotForm closeFn={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      <div className="grid gap-2">
        {user?.business?.timeslots?.length ? (
          user?.business?.timeslots?.map((timeslot) => (
            <div key={timeslot.id}>
              <Card>
                <CardHeader className="mb-4 flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                    <FaClock className="text-primary" />
                    {timeslot.time}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      className="text-primary"
                      variant={"secondary"}
                      size={"icon"}
                      onClick={() => handleDelete(timeslot.id)}
                    >
                      X
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center">No results.</p>
        )}
      </div>

      <AppBottomNav />
    </AppContainer>
  );
}
