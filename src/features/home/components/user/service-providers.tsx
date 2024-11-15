"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import { useFindManyBusiness } from "~/lib/hooks";

const BusinessSlider = () => {
  const { data: businesses } = useFindManyBusiness({
    take: 3,
  });
  return (
    <section>
      <h1 className="mb-4 text-lg font-bold text-foreground">
        Service Providers
      </h1>
      <ScrollArea className="mb-2 w-full whitespace-nowrap rounded-md">
        <div className="flex flex-col gap-2">
          {businesses?.map((business) => (
            <Link href={`./business/${business.id}`} key={business.id}>
              <Card className="w-full">
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
      </ScrollArea>
    </section>
  );
};

export { BusinessSlider };
