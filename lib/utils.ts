import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
import millify from 'millify';

export const getShortForm = (number: number): string => {
  if (number.toString().length > 5) {
    return millify(number, {
      precision: 3,
    });
  } else {
    return number.toString();
  }
}
