import React from "react";
import { AppContainer, AppNavbar } from "~/components/app";
import Link from "next/link";
import { BusinessSignUpForm } from "~/features/auth/components/forms/sign-up-business";

export default function SignUpPage() {
  return (
    <AppContainer>
      <AppNavbar title="Register Business" href="/sign-up" />
      <BusinessSignUpForm />
      <p className="mt-4">
        {`Already have an account?`} <Link href={"/sign-in"}>Sign In</Link>
      </p>
    </AppContainer>
  );
}
