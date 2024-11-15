"use client";

import { useSession } from "next-auth/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { useFindFirstUser } from "~/lib/hooks";

export const description = "A bar chart with a custom label";

const chartConfig = {
  appointments: {
    label: "Clients",
    color: "#f7711e",
  },
  label: {
    color: "hsl(var(--background))",
  },
};

export function LineChart() {
  const { data: session } = useSession();
  const { data: user } = useFindFirstUser({
    where: {
      id: session?.user.id,
      AND: {
        business: {
          appointments: {
            every: {
              status: "COMPLETED",
            },
          },
        },
      },
    },
    include: {
      business: {
        include: {
          appointments: {
            include: {
              pet: true,
            },
          },
        },
      },
    },
  });

  // Process the appointments data into the chartData format
  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "long" }),
    appointments: 0,
  }));

  if (user?.business?.appointments) {
    user.business.appointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.datetime);
      const monthIndex = appointmentDate.getMonth();
      chartData[monthIndex]!.appointments += 1;
    });
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Appointments Overview</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide={false}
            />
            <XAxis dataKey="appointments" type="number" hide={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="appointments" fill="#FB5C3E" radius={4}>
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={12}
                className="fill-[--color-label]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
