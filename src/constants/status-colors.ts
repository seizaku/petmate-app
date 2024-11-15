import { type Status } from "@prisma/client";

export const statusColors: Record<Status, string> = {
  PENDING: "bg-yellow-200 hover:bg-yellow-200 text-yellow-800",
  APPROVED: "bg-green-200 hover:bg-green-200 text-green-800",
  SCHEDULED: "bg-blue-200 hover:bg-blue-200 text-blue-800",
  COMPLETED: "bg-green-100 hover:bg-green-100 text-green-800",
  CANCELLED: "bg-red-200 hover:bg-red-200 text-red-800",
  DECLINED: "bg-red-300 hover:bg-red-300 text-red-900",
  RESCHEDULED: "bg-orange-200 hover:bg-orange-200 text-orange-800",
};