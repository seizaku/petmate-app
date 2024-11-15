/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getMonth, getYear } from "date-fns";
import { useEffect, useMemo, useState } from "react";
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
    where: {
      business: {
        appointments: {
          every: {
            status: "COMPLETED",
          },
        },
      },
    },
  });

  // Function to calculate monthly revenue based on completed appointments
  const calculateMonthlyRevenue = (
    transactions: any,
    year: number,
    month: number,
  ) => {
    return transactions
      .filter((transaction: any) => {
        const transactionDate = new Date(transaction.datetime);
        return (
          transaction.status === "COMPLETED" &&
          transactionDate.getFullYear() === year &&
          transactionDate.getMonth() === month
        );
      })
      .reduce(
        (total: number, transaction: any) => total + transaction.totalPrice,
        0,
      );
  };

  // // State to hold the calculated monthly revenue
  // const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  // // Calculate monthly revenue for the current month and year
  // useEffect(() => {
  //   if (user?.business?.appointments) {
  //     const currentYear = getYear(new Date());
  //     const currentMonth = getMonth(new Date());
  //     const revenue = calculateMonthlyRevenue(
  //       user.business.appointments,
  //       currentYear,
  //       currentMonth,
  //     );
  //     setMonthlyRevenue(revenue);
  //   }
  // }, [user]);

  const totalPriceSum = useMemo(() => {
    return (user?.business?.appointments ?? []).reduce((sum, appointment) => {
      return sum + (appointment.totalPrice || 0);
    }, 0);
  }, [user]);

  return (
    <div className="mb-4 grid grid-cols-1 gap-2">
      <Card className="bg-gradient bg-gradient-to-r from-primary via-primary/90 to-primary/70 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          <FaDollarSign className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ₱ {totalPriceSum?.toFixed(2)}
          </div>
          <p className="text-xs">
            {user?.business?.appointments.length ?? 0} total appointments
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export { TotalRevenue };
