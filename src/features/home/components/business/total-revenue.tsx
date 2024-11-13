"use client";

import { useMemo } from "react";
import { FaDollarSign } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useFindFirstUser } from "~/lib/hooks";

const TotalRevenue = () => {
  const { data: user } = useFindFirstUser({
    include: {
      business: {
        include: {
          appointments: true,
        },
      },
    },
  });

  const totalPriceSum = useMemo(() => {
    return user?.business?.appointments?.reduce((sum, appointment) => {
      return sum + (appointment.totalPrice || 0);
    }, 0);
  }, [user]);

  return (
    <div className="mb-4 grid grid-cols-1 gap-2">
      <Card className="bg-gradient bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <FaDollarSign className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₱{totalPriceSum?.toFixed(2)}</div>
          <p className="text-xs">
            {user?.business?.appointments.length} total appointments
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export { TotalRevenue };
