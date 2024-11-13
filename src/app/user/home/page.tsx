import Image from "next/image";
import Link from "next/link";
import { FaChevronRight, FaMagnifyingGlass } from "react-icons/fa6";
import { AppContainer } from "~/components/app";
import { AppBottomNav } from "~/components/app/app-bottom-nav";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "~/components/ui/card";
import { appConfig } from "~/config/app-config";
import { HomeNavbar } from "~/features/home/components/navbar";
import { BusinessSlider } from "~/features/home/components/user/service-providers";
import { UpcomingAppointment } from "~/features/home/components/user/upcoming-appointment";

export default function HomePage() {
  return (
    <AppContainer>
      <HomeNavbar />

      <Link
        href={"/search"}
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

      <Card className="bg-zinc-900 text-white transition-all ease-in-out hover:bg-muted hover:text-foreground">
        <CardHeader>
          <CardTitle>Pet Care Tip</CardTitle>
        </CardHeader>
        <CardContent>
          {`Regular brushing not only keeps your pet's coat healthy but also
  strengthens your bond. Aim for a few minutes of brushing each day!`}
        </CardContent>
        <CardFooter>
          <Link href="" className="flex items-center gap-2">
            More Tips <FaChevronRight className="h-3 w-3" />
          </Link>
        </CardFooter>
      </Card>
      <AppBottomNav />
    </AppContainer>
  );
}
