import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export const formDataToObject = (formData) => {
    let object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    return object;
};