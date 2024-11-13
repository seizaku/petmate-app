import React from "react";
import { AppContainer, AppNavbar } from "~/components/app";
import Link from "next/link";
import { UserSignUpForm } from "~/features/auth/components/forms/sign-up-user";

export default function SignUpPage() {
  return (
    <AppContainer>
      <AppNavbar title="Create Account" href="/sign-up" />
      <UserSignUpForm />
      <p className="mt-4">
        {`Already have an account?`} <Link href={"/sign-in"}>Sign In</Link>
      </p>
    </AppContainer>
  );
}
