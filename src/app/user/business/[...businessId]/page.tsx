import React from "react";
import { AppContainer, AppNavbar } from "~/components/app";
import { Business } from "~/features/business/components/business";

interface BusinessPage {
  params: {
    businessId: string[];
  };
}

export default async function BusinessPage({
  params,
}: {
  params: { businessId: Promise<string[]> };
}) {
  const id = await params.businessId;

  return (
    <AppContainer>
      <AppNavbar title="Service Provider" href="/user/search" />

      <Business businessId={id[0]!} />
    </AppContainer>
  );
}
