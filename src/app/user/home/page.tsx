import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AppContainer } from "~/components/app";
import { AppBottomNav } from "~/components/app/app-bottom-nav";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { appConfig } from "~/config/app-config";
import { HomeNavbar } from "~/features/home/components/navbar";
import { BusinessSlider } from "~/features/home/components/user/service-providers";
import { UpcomingAppointment } from "~/features/home/components/user/upcoming-appointment";
import { getRandomTips } from "~/features/pet-tips/lib/pet-tips";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <AppContainer>
      <HomeNavbar />

      <Link
        href={"/user/search"}
        className={buttonVariants({
          variant: "outline",
          size: "lg",
          className: "mb-4 w-full border bg-muted pl-4 hover:bg-background",
        })}
      >
        <div className="flex w-full items-center">
          <FaMagnifyingGlass className="mr-4 h-5 text-muted-foreground" />
          Search for services and clinics
        </div>
      </Link>

      <UpcomingAppointment />

      <div className="mb-4 grid gap-2">
        <Card>
          {appConfig.views.home.user.map((item) => (
            <Link key={item.title} href={item.href}>
              <CardHeader className="transition-all ease-in-out hover:bg-muted">
                <div className="flex items-center gap-4">
                  <Button variant={"secondary"} size={"icon"}>
                    {item.icon}
                  </Button>
                  <div className="space-y-1">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {item.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Link>
          ))}
        </Card>
      </div>

      <BusinessSlider />

      <Card className="bg-zinc-900 text-white">
        <CardHeader>
          <CardTitle className="mb-4">Pet Care Tip</CardTitle>
          {getRandomTips()}
        </CardHeader>
      </Card>
      <AppBottomNav />
    </AppContainer>
  );
}
