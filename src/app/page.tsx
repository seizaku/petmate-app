"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppLoader } from "~/components/app";
import { useFindFirstUser } from "~/lib/hooks";

export default function Root() {
  const { status: sessionStatus } = useSession();
  const { data: user, status: fetchUserStatus } = useFindFirstUser();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
      return;
    }
    console.log(user);

    if (sessionStatus == "authenticated" && fetchUserStatus == "success") {
      router.push(`${user?.role.toLowerCase()}/home`);
    }
  }, [sessionStatus]);

  if (status === "loading") {
    return <AppLoader />;
  }

  return null;
}
