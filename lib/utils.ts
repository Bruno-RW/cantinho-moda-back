import { type ClassValue, clsx } from "clsx";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
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

export function getUrl(headers: ReadonlyHeaders) {
  const url = headers.get('x-url') as string;
  const pathname = headers.get('x-pathname') as string;
  const origin = headers.get('x-origin') as string;

  return { url, pathname, origin };
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDateTime (date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(date);
}