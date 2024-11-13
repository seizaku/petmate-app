"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useCreateUser, useUpdateUser } from "~/lib/hooks";
import { UserCreateSchema } from "@zenstackhq/runtime/zod/models";
import { fileToBase64 } from "~/lib/utils";
import { toast } from "sonner";
import { type User } from "@prisma/client";

export function UserSignUpForm({ updateData }: { updateData?: User }) {
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: updateUser } = useUpdateUser();
  const [image, setImage] = useState(updateData?.image ?? "");
  const [name, setName] = useState(updateData?.name ?? "Lorem Ipsum");
  const [email, setEmail] = useState(updateData?.email ?? "user@petmate.com");
  const router = useRouter();

  const form = useForm<z.infer<typeof UserCreateSchema>>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: {
      ...(updateData ?? {
        name: "",
        email: "",
        password: "",
      }),
    },
  });

  async function onSubmit(data: z.infer<typeof UserCreateSchema>) {
    try {
      if (updateData) {
        await updateUser({
          data: {
            image: data.image,
            name: data.name,
            password: data.password ?? undefined,
            role: "USER",
          },
          where: {
            id: updateData.id,
          },
        });

        toast.success("Saved Changes!");
        router.push("/user/profile");
      } else {
        await createUser({
          data: {
            image: data.image,
            name: data.name,
            email: data.email,
            password: data.password,
            role: "USER",
          },
        });

        toast.success("Welcome to PetMate!");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create account");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Avatar className="mx-auto mb-4 h-28 w-28">
          <AvatarFallback></AvatarFallback>
          <AvatarImage src={image ?? "/lofi-girl.gif"} />
        </Avatar>

        <div>
          <h1 className="text-center text-xl font-bold capitalize">{name}</h1>

          <p className="mb-4 text-center">{email}</p>
        </div>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Profile</FormLabel>
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
              <FormLabel>Full name</FormLabel>

              <FormControl>
                <Input
                  placeholder="John Doe"
                  {...field}
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                    form.setValue("name", e.currentTarget.value);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input
                  placeholder="user@email.com"
                  {...field}
                  disabled={updateData && true}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                    form.setValue("email", e.currentTarget.value);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                  value={form.getValues("password") ?? ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={!image.length || !form.formState.isValid}
          className="w-full"
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
