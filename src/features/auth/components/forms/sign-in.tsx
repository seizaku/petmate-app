"use client";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { UserCreateSchema } from "@zenstackhq/runtime/zod/models";
import { FaGoogle } from "react-icons/fa6";

const SignInForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof UserCreateSchema>>({
    resolver: zodResolver(UserCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof UserCreateSchema>) {
    const auth = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (auth?.ok) {
      router.push(`/`);
    }
  }

  async function onGoogleSignIn() {
    await signIn("google", {
      // redirect: true,
      redirectTo: "/user/home",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => console.error(error))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" {...field} />
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
                  placeholder="Your password"
                  {...field}
                  value={form.getValues().password ?? undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <div className="relative flex items-center">
          <Separator className="my-2" />
          <div className="absolute top-0 flex w-full justify-center">
            <span className="w-fit bg-background px-2 text-xs">OR</span>
          </div>
        </div>
        <Button
          onClick={onGoogleSignIn}
          type="button"
          variant="outline"
          className="w-full"
        >
          <FaGoogle />
          Continue with Google
        </Button>
      </form>
    </Form>
  );
};

export { SignInForm };
