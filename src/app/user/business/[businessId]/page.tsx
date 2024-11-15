import React from "react";
import { AppContainer, AppNavbar } from "~/components/app";
import { Business } from "~/features/business/components/business";

interface BusinessPage {
  params: Promise<{ businessId: string }>;
}

export default async function BusinessPage({ params }: BusinessPage) {
  return (
    <AppContainer>
      <AppNavbar title="Service Provider" href="/user/search" />

      <Business businessId={(await params).businessId} />
    </AppContainer>
  );
}
