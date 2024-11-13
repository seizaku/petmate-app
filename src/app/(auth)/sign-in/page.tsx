import React from "react";
import { AppContainer } from "~/components/app";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import { SignInForm } from "~/features/auth/components/forms/sign-in";
import Image from "next/image";

export default function SignInPage() {
  return (
    <AppContainer className="bg-primary">
      <div className="flex h-full w-full flex-col justify-center">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={180}
          height={180}
          className="mx-auto mt-6 pl-2 drop-shadow-md"
        />

        <div className="absolute bottom-0 left-0 w-full">
          <div className="relative">
            <Image
              src={"/cat.svg"}
              alt="logo"
              width={280}
              height={280}
              className="absolute inset-0 -top-52 mx-auto mt-2 drop-shadow-md"
            />
          </div>
          <Card className="container mx-auto min-h-[500px] w-full rounded-3xl rounded-b-none border border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Sign In</CardTitle>
              <CardDescription>Lorem Ipsum sit amet</CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm />
            </CardContent>
            <CardFooter>
              <p>
                {`Don't have an account?`}{" "}
                <Link href={"/sign-up"}>Sign Up</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppContainer>
  );
}
