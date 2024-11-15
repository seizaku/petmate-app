"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Pet } from "@prisma/client";
import { PetCreateSchema } from "@zenstackhq/runtime/zod/models";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { useCreatePet, useUpdatePet } from "~/lib/hooks";
import { fileToBase64 } from "~/lib/utils";

export function PetForm({
  updateData,
  closeFn,
}: {
  updateData?: Pet;
  closeFn: () => void;
}) {
  const { data: session } = useSession();
  const { mutateAsync: createPet } = useCreatePet();
  const { mutateAsync: updatePet } = useUpdatePet();
  const [image, setImage] = useState<string | null>(updateData?.image ?? null);
  const [name, setName] = useState<string | null>(
    updateData?.name ?? "Pet Name",
  );

  const form = useForm<z.infer<typeof PetCreateSchema>>({
    resolver: zodResolver(PetCreateSchema),
    defaultValues: {
      ...(updateData ?? {
        image: "",
        name: "",
        age: "1",
        breed: "",
        gender: undefined,
        ownerId: "",
      }),
    },
  });

  async function onSubmit(data: z.infer<typeof PetCreateSchema>) {
    try {
      if (updateData) {
        await updatePet({
          data: {
            image: data.image,
            name: data.name,
            age: data.age,
            species: data.species,
            breed: data.breed,
            gender: data.gender,
            owner: {
              connect: {
                id: session?.user.id,
              },
            },
          },
          where: {
            id: data.id,
          },
        });
      } else {
        await createPet({
          data: {
            image: data.image,
            name: data.name,
            age: data.age,
            species: data.species,
            breed: data.breed,
            gender: data.gender,
            owner: {
              connect: {
                id: session?.user.id,
              },
            },
          },
        });
      }

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
        <Avatar className="mx-auto mb-4 h-28 w-28">
          <AvatarFallback></AvatarFallback>
          <AvatarImage src={image ?? ""} />
        </Avatar>

        <h1 className="mb-8 text-center text-xl font-bold capitalize">
          {name}
        </h1>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Picture</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={async (e) => {
                    if (!e.target.files) {
                      field.onChange(undefined);
                      return;
                    }
                    const image = await fileToBase64(e.target.files[0]!);
                    setImage(image);
                    field.onChange(image);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pet name</FormLabel>

              <FormControl>
                <Input
                  placeholder="Your pet's name"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.currentTarget.value);
                    setName(e.currentTarget.value);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="species"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Species</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={(value) => form.setValue("species", value)}
                >
                  <SelectTrigger id="species">
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="bird">Bird</SelectItem>
                    <SelectItem value="rabbit">Rabbit</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Breed</FormLabel>

                <FormControl>
                  <Input placeholder="Breed" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Age <small>(Months)</small>
                </FormLabel>

                <FormControl>
                  <Input type="number" placeholder="Age" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>

              <FormControl>
                <RadioGroup
                  {...field}
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MALE" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {updateData ? "Save Changes" : "Register Pet"}
        </Button>
      </form>
    </Form>
  );
}
