import React from "react";
import { AppContainer, AppNavbar } from "~/components/app";
import Appointment from "~/features/appointment/components/appointment";

type AppointmentPage = {
  params: Promise<{ appointmentId: string }>;
};

export default async function AppointmentPage({ params }: AppointmentPage) {
  return (
    <AppContainer>
      <AppNavbar title="Service Provider" href="/business/appointments" />

      <Appointment appointmentId={(await params).appointmentId} />
    </AppContainer>
  );
}
