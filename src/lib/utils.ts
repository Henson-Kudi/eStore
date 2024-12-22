import { UserDeviceDetails } from "@/types";
import { type ClassValue, clsx } from "clsx"
import platform from "platform";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const getClientDeviceInfo: () => UserDeviceDetails = () => {
  return {
    'user-agent': typeof window !== 'undefined' ? navigator.userAgent : platform.ua ?? 'Unknown',
    'device-type': platform.product || 'Unknown',
    os: platform.os ? platform.os.toString() : 'Unknown',
    browser: platform.name || 'Unknown',
    version: platform.version || 'Unknown', // browser version
  };
};
