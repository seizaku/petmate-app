import React from "react";
import { AppContainer, AppNavbar } from "~/components/app";
import Appointment from "~/features/appointment/components/appointment";

export default async function AppointmentPage({
  params,
}: {
  params: { appointmentId: Promise<string[]> };
}) {
  const id = await params.appointmentId;

  return (
    <AppContainer>
      <AppNavbar title="Service Provider" href="/business/appointments" />

      <Appointment appointmentId={id[0]!} />
    </AppContainer>
  );
}
