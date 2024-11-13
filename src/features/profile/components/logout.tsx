"use client";
import { signOut } from "next-auth/react";
import { FaChevronRight } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";

const SignOut = () => {
  async function onSignOut() {
    await signOut({
      redirectTo: "/sign-in",
    });
  }

  return (
    <Card className="cursor-pointer divide-y bg-destructive text-white shadow-none hover:bg-destructive/90">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={onSignOut} variant={"outline"} size={"icon"}>
              <HiOutlineLogout className="text-primary" />
            </Button>
            <div className="space-y-1">
              <CardTitle>Logout</CardTitle>
            </div>
          </div>
          <FaChevronRight />
        </div>
      </CardContent>
    </Card>
  );
};

export { SignOut };
