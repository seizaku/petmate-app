/* eslint-disable prefer-const */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export function combineDateAndTime(date: Date, time: string) {
  // Extract hours and minutes from the time string
  const [timePart, modifier] = time.split(" ");
  let [hours, minutes] = timePart!.split(":").map(Number);

  // Adjust hours for AM/PM format
  if (modifier === "PM" && hours! < 12) hours! += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  // Set the hours and minutes to the selected date
  const combinedDate = new Date(date);
  combinedDate.setHours(hours!, minutes, 0, 0); // set seconds and milliseconds to 0

  return combinedDate;
}