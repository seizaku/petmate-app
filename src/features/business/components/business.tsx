/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Image from "next/image";
import {
  useCreateAppointment,
  useCreateNotification,
  useFindFirstBusiness,
  useFindFirstUser,
} from "~/lib/hooks";
import { combineDateAndTime } from "~/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Calendar } from "~/components/ui/calendar";
import { GoogleMapEmbed } from "~/features/gmap/components/page";
import { Checkbox } from "~/components/ui/checkbox";
import { Textarea } from "~/components/ui/textarea";

const Business = ({ businessId }: { businessId: string }) => {
  const { data: user } = useFindFirstUser({
    include: {
      pets: true,
    },
  });
  const { data: business } = useFindFirstBusiness({
    include: {
      services: {
        include: {
          variants: true,
        },
      },
      timeslots: true,
    },
    where: {
      id: businessId,
    },
  });

  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [selectedPet, setSelectedPet] = useState<string | undefined>();
  const [note, setNote] = useState<string | undefined>();

  const { mutateAsync: createAppointment } = useCreateAppointment();
  const { mutateAsync: createNotification } = useCreateNotification();

  const toggleService = (id: string) => {
    setSelectedServices((prevSelected) => {
      // If the service ID is already selected, remove it (deselect)
      if (prevSelected.includes(id)) {
        return prevSelected.filter((serviceId) => serviceId !== id);
      } else {
        // If the service ID is not selected, add it (select)
        return [...prevSelected, id];
      }
    });
  };
  const totalPrice = selectedServices.reduce((sum, serviceId) => {
    let result: any = null;
    business?.services.forEach((service) => {
      const found = service.variants.find((variant) => variant.id == serviceId);
      if (found) {
        result = found;
      }
    });
    return sum + (result.price || 0);
  }, 0);

  async function onSubmit() {
    try {
      await createAppointment({
        data: {
          datetime: combineDateAndTime(selectedDate!, selectedTime!),
          status: "PENDING",
          totalPrice,
          note,
          pet: {
            connect: {
              id: parseInt(selectedPet!),
            },
          },
          services: {
            createMany: {
              data: selectedServices.map((variantId) => ({
                variantId,
              })),
            },
          },
          business: {
            connect: {
              id: businessId,
            },
          },
        },
      });

      await createNotification({
        data: {
          userMessage: `Your appointment is now pending`,
          businessMessage: `${user?.name} has booked an appointment.`,
          type: "INFO",
          user: {
            connect: {
              id: user?.id,
            },
          },
          business: {
            connect: {
              id: business?.id,
            },
          },
        },
      });

      toast.success("Appointment created");
      router.push("/user/appointments");
    } catch (error) {
      console.error(error);
      toast.error("Failed to process appointment");
    }
  }

  return (
    <>
      <Card className="mb-2 w-full">
        <CardContent className="p-0">
          <div className="flex items-center p-4">
            <Image
              height={400}
              width={400}
              src={business?.logo ?? "/placeholder.svg"}
              alt={`_`}
              className="mr-4 h-16 w-16 rounded-full object-cover"
            />
            <div className="text-wrap">
              <h2 className="font-semibold">{business?.businessName}</h2>
              <p className="text-xs text-muted-foreground">
                {business?.address}
              </p>
              <p className="text-xs text-foreground">{business?.phoneNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="services" className="mb-4 w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>
        <TabsContent value="services">
          {business?.services?.map((service) => (
            <div key={service.id} className="mt-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold">
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex items-center justify-between"
                      >
                        <Checkbox
                          id={variant.id}
                          value={variant.id}
                          checked={selectedServices.includes(
                            variant.id as string,
                          )}
                          onCheckedChange={() =>
                            toggleService(variant.id as string)
                          }
                          className="mr-2 border-zinc-300"
                        />
                        <label
                          htmlFor={variant.id}
                          className="flex-grow text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {variant.name}
                        </label>

                        <span className="font-medium">
                          ₱{variant.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="location">
          <GoogleMapEmbed address={business?.address ?? "Zamboanga City"} />
        </TabsContent>
      </Tabs>

      <Card className="mb-4">
        <CardHeader>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            fromDate={new Date()}
            className="flex h-full w-full"
            classNames={{
              months:
                "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
              month: "space-y-6 w-full flex flex-col",
              table: "w-full h-full border-collapse space-y-2",
              head_row: "",
              row: "w-full mt-2",
            }}
          />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Select value={selectedTime} onValueChange={setSelectedTime} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a time slot" />
            </SelectTrigger>
            <SelectContent>
              {business?.timeslots.map((slot) => (
                <SelectItem key={slot.id} value={slot.time}>
                  <span className="text-sm">{slot.time}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedPet}
            disabled={!user?.pets.length}
            onValueChange={setSelectedPet}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  user?.pets.length ? "Select pet" : "You have no pets yet."
                }
              />
            </SelectTrigger>
            <SelectContent>
              {user?.pets.map((pet) => (
                <SelectItem key={pet.id} value={pet.id.toString()}>
                  {pet.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="mb-2">Note</CardTitle>
          <Textarea
            rows={5}
            placeholder="Any additional information we should know beforehand?"
            onChange={(e) => setNote(e.currentTarget.value)}
          ></Textarea>
        </CardHeader>
      </Card>

      <Card className="fixed bottom-0 left-0 w-full rounded-b-none">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <h1>Total</h1>
              <h1 className="font-bold">₱{totalPrice.toFixed(2)}</h1>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            size="lg"
            disabled={
              !selectedServices.length || !selectedTime || !selectedPet?.length
            }
            onClick={onSubmit}
          >
            Book Appointment
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export { Business };
