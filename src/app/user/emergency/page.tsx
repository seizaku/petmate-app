"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { useFindManyBusiness } from "~/lib/hooks";
import { AppBottomNav, AppContainer, AppNavbar } from "~/components/app";
import Image from "next/image";
import { GoogleMapEmbed } from "~/features/gmap/components/map-embed";
import { sortByNearest } from "~/features/gmap/lib/geocoding";
import { type Business } from "@prisma/client";

export default function SearchPage() {
  const [nearest, setNearest] = useState<Business[]>();
  const { data: business, status } = useFindManyBusiness({
    include: { services: true },
    take: 5,
  });

  useEffect(() => {
    setNearest(
      sortByNearest(
        { lat: "6.9076158", lng: "122.0681293" },
        business as Business[],
      ),
    );
  }, [status]);

  return (
    <AppContainer>
      <AppNavbar title="Emergency" href="/user/home" />

      {/* Clinic Cards */}
      <section className="mt-4 flex flex-col gap-4 pb-12">
        {nearest?.map((business) => (
          <Link href={`tel:${business.phoneNumber}`} key={business.id}>
            <Card className="w-full">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <Image
                    height={64}
                    width={64}
                    src={business.logo ?? "/placeholder-logo.png"}
                    alt={`${business.businessName} logo`}
                    className="mr-4 h-16 w-16 rounded-full object-cover"
                  />
                  <div className="text-wrap">
                    <h2 className="font-semibold">{business.businessName}</h2>
                    <p className="text-xs text-muted-foreground">
                      {business.address || "Address not available"}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <GoogleMapEmbed address={business.address} />
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <AppBottomNav />
    </AppContainer>
  );
}
