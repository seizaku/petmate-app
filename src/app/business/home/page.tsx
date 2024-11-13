import Link from "next/link";
import { Button } from "~/components/ui/button";
import { AppContainer } from "~/components/app";
import { AppBottomNav } from "~/components/app/app-bottom-nav";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { appConfig } from "~/config/app-config";
import { HomeNavbar } from "~/features/home/components/navbar";
import { AppointmentsToday } from "~/features/home/components/business/appointments-today";
import { TotalRevenue } from "~/features/home/components/business/total-revenue";

export default function HomePage() {
  return (
    <AppContainer>
      <HomeNavbar />

      <TotalRevenue />

      <AppointmentsToday />

      <div className="mb-4 grid gap-2">
        <Card>
          {appConfig.views.home.provider.map((item) => (
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

      <AppBottomNav />
    </AppContainer>
  );
}
