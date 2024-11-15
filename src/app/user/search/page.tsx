"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Separator } from "~/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
} from "~/components/ui/select";
import { useFindManyBusiness, useFindManyService } from "~/lib/hooks";
import { AppBottomNav, AppContainer, AppNavbar } from "~/components/app";
import Image from "next/image";

export default function SearchPage() {
  const { data: clinics } = useFindManyBusiness({
    include: { services: true },
  });
  const { data: services } = useFindManyService({
    distinct: "name",
  });
  const [filter, setFilter] = useState("");

  const filteredClinics = clinics?.filter((clinic) => {
    const matchesBusinessName = clinic.businessName
      ?.toLowerCase()
      .includes(filter.toLowerCase());
    const matchesService = clinic.services?.some((service) =>
      service.name.toLowerCase().includes(filter.toLowerCase()),
    );
    return matchesBusinessName || matchesService;
  });

  return (
    <AppContainer>
      <AppNavbar title="Search" href="/user/home" />

      {/* Search Input */}
      <div className="relative">
        <Input
          onChange={(e) => setFilter(e.currentTarget.value)}
          className="border bg-muted pl-10"
          placeholder="Search for clinics or services"
        />
        <FaMagnifyingGlass className="absolute left-3.5 top-2 h-5 text-muted-foreground" />
      </div>

      {/* Separator with OR */}
      <div className="relative my-6">
        <span className="absolute inset-x-0 -top-2 mx-auto w-fit bg-background px-2 text-center text-xs text-muted-foreground">
          OR
        </span>
        <Separator />
      </div>

      {/* Service Filter */}
      <Select onValueChange={(value) => setFilter(value)}>
        <SelectTrigger className="bg-muted">
          <SelectValue placeholder="Filter services" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Services</SelectLabel>
            {services?.map((item) => (
              <SelectItem
                key={item.id}
                value={item.name.toLowerCase()}
                className="capitalize"
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Clinic Cards */}
      <section className="mt-4 flex flex-col gap-4 pb-12">
        {filteredClinics?.map((business) => (
          <Link href={`/user/business/${business.id}`} key={business.id}>
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
            </Card>
          </Link>
        ))}
      </section>

      <AppBottomNav />
    </AppContainer>
  );
}
