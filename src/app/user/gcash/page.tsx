import Link from "next/link";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

export default function GCashPage() {
  return (
    <div className="relative h-screen w-full bg-gray-200">
      <div className="absolute left-0 top-0 h-[500px] w-full bg-blue-700">
        <img src="/gcash.svg" className="mx-auto mt-12" />
      </div>
      <div className="absolute z-10 flex h-screen w-full items-center justify-center">
        <Card className="h-72 w-full max-w-sm rounded border-background">
          <CardHeader className="bg-muted text-gray-400">
            <div className="grid w-64 grid-cols-2 gap-4">
              <CardTitle className="font-normal">Merchant:</CardTitle>
              <CardTitle className="font-normal">PetMate</CardTitle>
              <CardTitle className="font-normal">Amount Due:</CardTitle>
              <span className="text-sm text-blue-600">PHP 100.00</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mx-auto w-64">
              <h1 className="my-4 text-sm font-bold">
                Login to pay with GCash
              </h1>
              <Input
                className="mt-2 rounded-none"
                placeholder="(+63) 945 586 8528"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Link
              href={"/user/appointments"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mx-auto w-64 rounded-full bg-blue-700 hover:bg-blue-600",
              )}
            >
              Next
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
