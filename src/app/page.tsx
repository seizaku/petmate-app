"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppLoader } from "~/components/app";
import { useFindFirstUser } from "~/lib/hooks";

export default function Root() {
  const { data: user } = useFindFirstUser();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
      return;
    }

    if (status === "loading") {
      // Do nothing, just wait for authentication state to settle
      return;
    }

    if (!user?.role) {
      // If role is undefined, redirect to an error page or show a loading indicator
      router.push("/error");
      return;
    }

    if (status === "authenticated") {
      router.push(`${user.role.toLowerCase()}/home`);
    }
  }, [status, user?.role]);

  if (status === "loading") {
    return <AppLoader />;
  }

  return null;
}
