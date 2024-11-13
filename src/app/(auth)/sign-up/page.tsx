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
import { Button } from "~/components/ui/button";
import { FaChevronRight, FaStethoscope, FaUser } from "react-icons/fa6";
import Image from "next/image";

export default function SignUpPage() {
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
          <Card className="container mx-auto min-h-[400px] w-full rounded-3xl rounded-b-none border border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
              <CardDescription>
                Choose your role in this community
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Link href={"/sign-up/business"}>
                <CardContent className="rounded-xl border py-4 hover:bg-muted">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant={"secondary"} size={"icon"}>
                        <FaStethoscope className="text-primary" />
                      </Button>
                      <div className="space-y-1">
                        <CardTitle>Service Provider</CardTitle>
                      </div>
                    </div>
                    <FaChevronRight />
                  </div>
                </CardContent>
              </Link>
              <Link href={"/sign-up/user"}>
                <CardContent className="rounded-xl border py-4 hover:bg-muted">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant={"secondary"} size={"icon"}>
                        <FaUser className="text-primary" />
                      </Button>
                      <div className="space-y-1">
                        <CardTitle>Pet Owner</CardTitle>
                      </div>
                    </div>
                    <FaChevronRight />
                  </div>
                </CardContent>
              </Link>
            </CardContent>
            <CardFooter>
              <p>
                {`Already have an account? `}
                <Link href={"/sign-in"}>Sign In</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AppContainer>
  );
}
