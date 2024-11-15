"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimeSlotCreateSchema } from "@zenstackhq/runtime/zod/models";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { Button } from "~/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { Input } from "~/components/ui/input";
import { useCreateTimeSlot } from "~/lib/hooks";

export function TimeslotForm({ closeFn }: { closeFn: () => void }) {
  const { data: session } = useSession();
  const { mutateAsync: createTimeSlot } = useCreateTimeSlot();

  const form = useForm<z.infer<typeof TimeSlotCreateSchema>>({
    resolver: zodResolver(TimeSlotCreateSchema),
    defaultValues: {
      businessId: "",
      time: "",
    },
  });

  async function onSubmit(data: z.infer<typeof TimeSlotCreateSchema>) {
    try {
      const time = new Date(`1970-01-01T${data.time}:00`).toLocaleTimeString(
        [],
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        },
      );

      await createTimeSlot({
        data: {
          time,
          business: {
            connect: {
              ownerId: session?.user.id,
            },
          },
        },
      });

      toast.success("Saved!");
      closeFn();
    } catch (error) {
      console.error(error);
      toast.error("Action failed");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => console.error(error))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Time</FormLabel>

              <FormControl>
                <Input type="time" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
}
