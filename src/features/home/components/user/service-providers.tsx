"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import { ScrollBar } from "~/components/ui/scroll-area";
import { useFindManyBusiness } from "~/lib/hooks";

const BusinessSlider = () => {
  const { data: businesses } = useFindManyBusiness();
  return (
    <section className="mb-4">
      <h1 className="mb-4 text-lg font-bold text-foreground">Near You</h1>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 pb-4">
          {businesses?.map((business) => (
            <Link href={`./business/${business.id}`} key={business.id}>
              <Card className="max-w-[360px]">
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <Image
                      height={400}
                      width={400}
                      src={business.logo ?? ""}
                      alt={`_`}
                      className="mr-4 h-16 w-16 rounded-full object-cover"
                    />
                    <div className="text-wrap">
                      <h2 className="font-semibold">{business.businessName}</h2>
                      <p className="text-xs text-muted-foreground">
                        {business.address}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export { BusinessSlider };
