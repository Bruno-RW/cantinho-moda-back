import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string) {
  const nameArray = fullName.split(" ");

  const firstName = nameArray[0].charAt(0).toUpperCase();
  const lastName = nameArray[nameArray.length - 1].charAt(0).toUpperCase();

  return firstName + lastName;
}