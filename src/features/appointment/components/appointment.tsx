"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { FaCalendar, FaClock } from "react-icons/fa6";
import { format } from "date-fns";
import { Button } from "~/components/ui/button";
import { useFindFirstAppointment } from "~/lib/hooks";
import { Badge } from "~/components/ui/badge";

export default function Appointment({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const { data: appointment } = useFindFirstAppointment({
    where: {
      id: appointmentId,
    },
    include: {
      business: true,
      services: {
        include: {
          variant: {
            include: {
              service: true,
            },
          },
        },
      },
    },
  });

  return (
    <>
      <Card className="mb-4 shadow-none">
        <CardHeader>
          <CardTitle className="text-lg">
            <div className="flex items-center justify-between">
              <span>{appointment?.business.businessName}</span>
              <Badge variant={"outline"} className={`shadow-none`}>
                {appointment?.status}
              </Badge>
            </div>
          </CardTitle>
          <CardDescription>{appointment?.business.address}</CardDescription>
        </CardHeader>
      </Card>
      <Card className="mb-4">
        <CardHeader className="transition-all ease-in-out hover:bg-muted">
          <div className="flex items-center gap-4">
            <Button variant={"secondary"} size={"icon"}>
              <FaCalendar className="text-primary" />
            </Button>
            <div className="space-y-1">
              <CardTitle>Date</CardTitle>
              <CardDescription className="text-xs">
                {appointment?.datetime.toDateString()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardHeader className="transition-all ease-in-out hover:bg-muted">
          <div className="flex items-center gap-4">
            <Button variant={"secondary"} size={"icon"}>
              <FaClock className="text-primary" />
            </Button>
            <div className="space-y-1">
              <CardTitle>Time</CardTitle>
              <CardDescription className="text-xs">
                {format(
                  appointment?.datetime.toUTCString() ?? new Date(),
                  "hh:mm a",
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card className="mb-4">
        <CardHeader className="divide-y p-0">
          {appointment?.services?.map((service) => (
            <div key={service.id} className="mt-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-semibold">
                  {service.variant.service.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex-grow text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {service.variant.name}
                    </label>

                    <span className="font-medium">
                      ₱{service.variant.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </div>
          ))}
        </CardHeader>
      </Card>
      <Card className="bg-gradient mb-4 bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-white">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <h1 className="text-xl">Total</h1>
              <h1 className="text-2xl font-bold">
                ₱ {appointment?.totalPrice.toFixed(2)}
              </h1>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  );
}
