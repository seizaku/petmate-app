"use client";
import React from "react";
import { AppNavbar, AppContainer } from "~/components/app";
import { useFindFirstUser } from "~/lib/hooks";
import { AppBottomNav } from "~/components/app/app-bottom-nav";
import { UserSignUpForm } from "~/features/auth/components/forms/sign-up-user";

export default function EditProfilePage() {
  const { data: user } = useFindFirstUser();

  return (
    <AppContainer>
      <AppNavbar title="Profile" href="/user/home" />

      <UserSignUpForm updateData={user} />

      <AppBottomNav />
    </AppContainer>
  );
}
