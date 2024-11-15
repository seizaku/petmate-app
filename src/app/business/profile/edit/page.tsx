import { AppNavbar, AppContainer } from "~/components/app";
import { AppBottomNav } from "~/components/app/app-bottom-nav";
import { BusinessProfileForm } from "~/features/profile/components/forms/business/business-profile";

export default function EditProfilePage() {
  return (
    <AppContainer>
      <AppNavbar title="Profile" href="/business/home" />

      <BusinessProfileForm />

      <AppBottomNav />
    </AppContainer>
  );
}
